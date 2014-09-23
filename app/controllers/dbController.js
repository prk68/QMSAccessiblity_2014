
/*************************************************************************************************** Include the collections *******************/
var mongoose = require('mongoose')
var indexModel = require("../models/procedure").indexModel;
var artifactModel = require("../models/procedure").artifactModel;
var notificationModel = require("../models/procedure").notificationModel;

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({  host: 'localhost:9200',  log: 'trace'});

var S = require('string')

/**************************************************************************************************************************************/

var procedureExists = function(request, response){

	if(!request.params.id)
	{
		response.status(500).send();
		return;
	}

	indexModel.count({pid: request.params.id}, function(err, count){
		if(!err)
		{
			if(count > 0)
				response.send({exists:true})
			else
				response.send({exists:false})
		}
		else
			response.status(500).send()
	})
}

var draftExists = function(request, response){

	if(!request.params.id)
	{
		response.status(500).send();
		return;
	}
	
	artifactModel.findOne({pid: request.params.id, in_draft:true}, function(err, result){
		if(!err)
		{
			if(result)
				response.send({locked:true, locker:result.metaData.owner})
			else
				response.send({locked:false})
		}
		else
			response.status(500).send()
	})
}


var procedureorDraftExists = function(request, response){

	if(!request.params.id)
	{
		response.status(500).send();
		return;
	}

	artifactModel.count({pid: request.params.id}, function(err, count){
		if(!err)
		{
			if(count > 0)
				response.send({exists:true})
			else
				response.send({exists:false})
		}		
	})
}

var submitDraftProcedure = function(request, response){

	var newDraft = new artifactModel();
	console.log(request.body.draft_type)
	newDraft.pid = request.body.procedure.pid
	newDraft.pname =  request.body.procedure.pname
	newDraft.version = request.body.procedure.version
	newDraft.date_of_modification = new Date()
	newDraft.mappings = request.body.procedure.mappings
	newDraft.metaData = request.body.procedure.metaData
	newDraft.data = request.body.procedure.data
	newDraft.in_draft = true
	newDraft.draft_type = request.body.draft_type
	newDraft.rejections =  []
	newDraft.rejected = false
	
	newDraft.save(function (err) { 
		if (err) 
			response.send(501, 'draft ' + newDraft.pid + 'could not be saved'); 
		else
			response.send('ok');
	})
}

var updateDraftProcedure = function(request, response){

	artifactModel.findOneAndUpdate({pid: request.body.procedure.pid, in_draft:true}, 
										{
											version : request.body.procedure.version,
											date_of_modification : new Date(),
											mappings : request.body.procedure.mappings,
											metaData : request.body.procedure.metaData,
											data : request.body.procedure.data,
											rejected: false
										}, function(err, result){
		if (err && newDraft) 
			response.send(501, 'draft ' + newDraft.pid + 'could not be updated'); 
		else
			response.send('ok')
	})
}

var getActiveVersionNumber = function(request, response){

	indexModel.findOne({pid:request.params.id, trashed: false}, function(err, result)
	{
		if(!err && result)
			response.send({baseline:result.active_version})
		else
			response.status(500).send()
	})	
}


var getNonActiveVersion = function(request, response){

	artifactModel.findOne({pid:request.query.id, version:request.query.rev}, function(err, result)
	{
		if(!err)
			response.send(result)
		else
			response.status(500).send()
	})	
}



var getVersionIds = function(request, response){

	artifactModel.find({pid: request.params.id, in_draft:false}, 'version date_of_modification', function(err, result){
		if(!err)
		{
			var procVersions = []
			var procModifiedDates = []
			for(i=0; i<result.length; ++i)
			{
				procVersions.push(result[i].version)
				procModifiedDates.push(result[i].date_of_modification)
			}
			response.send({versions:procVersions, dates:procModifiedDates})
		}	
		else
			response.status(500).send({versions:[]})
	})	
}

var getAllDrafts = function(response){

	artifactModel.find({in_draft:true}, 'pid pname version date_of_modification metaData draft_type rejected', function(err, drafts){
		if(!err)
			response.send(drafts)
		else
			response.status(500).send({})
	})
}

var getDraft = function(request, response){
	
	artifactModel.findOne({pid: request.params.id, in_draft:true}, function(err, draft){
		if(!err)
			response.send(draft)
		else
			response.status(500).send({})
	})
}

var approveDraft = function(request, response){
	
	artifactModel.findOneAndUpdate({pid: request.body.pid, in_draft:true}, {in_draft: false, rejected:false, remarks:[]}, function(err, procedure){
		if(err)
			response.status(500).send()
		else
		{
			var curDate = new Date()
			indexModel.update({pid:procedure.pid, pname: procedure.pname}, {trashed:false, date_of_modification: curDate, active_version:procedure.version}, {upsert:true},
				function(err){
					if(err)
						response.status(500).send()
					else
					{
						var notifType = (procedure.draft_type == "new") ? "Created" : "Edited"
				
						var newNotification = new notificationModel({
													pid: procedure.pid,
													pname: procedure.pname,
													type: notifType,
													author: procedure.metaData.owner,
													reviewer: procedure.metaData.reviewer,
													date:  curDate,
													comments: procedure.metaData.comments,
													version: procedure.version})

						newNotification.save(function(err){
							if(err)
								response.status(500).send()
							else
							{
								client.index({
									index: 'procedurecontent',
									type: 'String',
									id: procedure.pid,
									body: {							
										name: procedure.pname,
										content : S(procedure.data.content).stripTags().s
									 }
									}, 
									function(err)
									{
										if(!err)
										{
											client.index({
												index: 'procedurecontenthtml',
												type: 'String',
												id: procedure.pid,
												body: {							
													name: procedure.pname,
													content : S(procedure.data.content).s
												 }
												},function(err){
													if(!err)
														response.send('ok');
													else
														response.status(500).send()
												})
										}
										else
											response.send('ok')
								})								
							}										
						})						
					}						
			})
		}
	})
}


var getAllProcedures = function(response){

	indexModel.find({trashed:false}, function(err, procedure){
	
		if(!err)
			response.send(procedure)
		else
			response.status(500).send({})
	})
}

var getProcedure = function(request, response){

	indexModel.findOne({pid: request.params.id, trashed:false}, 'active_version', function(err, result){

		if(err)
			response.status(500).send()
		else{
			if(result)
			{
				artifactModel.findOne({pid: request.params.id, version:result.active_version, in_draft:false}, function(err, procedure){
					
					if(!err)
						response.send(procedure)
					else
						response.status(500).send({})
				})
			}
		}
	})
}


var discardDraftProcedure = function(request, response){

	artifactModel.remove({pid: request.body.pid, in_draft:true}, function (err) { 
		if (err) 
			response.send(501, 'draft procedure could not be discarded'); 
		else
			response.send('ok');
	})
}


var rejectDraftProcedure = function(request, response){

	console.log(request.body.remarks)

	artifactModel.update({pid: request.body.pid, in_draft:true}, {$push: {rejections:request.body.remarks}, rejected:true}, function (err) { 
		console.log(err)
		if (err) 
			response.send(501, 'draft procedure could not be discarded'); 
		else
			response.send('ok');
	})
}


var removeProcedure = function(request, response){
	var curDate = new Date()
	indexModel.findOneAndUpdate({pid: request.body.pid}, {trashed: true, date_of_modification: curDate}, function (err, procedure) { 
		console.log(err)
		if (err) 
			response.send(501, 'procedure could not be remove'); 
		else
		{
			var newNotification = new notificationModel({
									pid: procedure.pid,
									pname: procedure.pname,
									type: "Removed",
									author: request.body.owner,
									date:  curDate,
									comments: request.body.comments
								})

			newNotification.save(function(err){
				if(err)
					response.status(500).send()
				else
					response.send('ok')
			})						
		}
	})
}


var restoreProcedure = function(request, response){

	var curDate = new Date()
	indexModel.findOneAndUpdate({pid: request.body.pid}, {trashed: false, date_of_modification: curDate}, function (err, procedure) { 
		console.log(err)
		if (err) 
			response.send(501, 'procedure could not be restored'); 
		else
		{
			var newNotification = new notificationModel({
									pid: procedure.pid,
									pname: procedure.pname,
									type: "Restored",
									author: request.body.owner,
									date:  curDate,
									comments: request.body.comments
								})

			newNotification.save(function(err){
				if(err)
					response.status(500).send()
				else
				{
					response.send('ok')
				}							
			})						
		}			
	})
}


var revertProcedure = function(request, response){

	var curDate = new Date()
	indexModel.findOneAndUpdate({pid: request.body.pid}, {active_version:request.body.version, date_of_modification: curDate}, function (err, procedure) { 
		console.log(err)
		if (err) 
			response.send(501, 'procedure could not be reverted'); 
		else
		{
			artifactModel.findOne({pid: request.body.pid, version:request.body.version}, function(err, procedure)
			{

				if(err)
					response.status(500).send()
				else
				{
					var newNotification = new notificationModel({
											pid: procedure.pid,
											pname: procedure.pname,
											type: "Reverted",
											author: request.body.owner,
											version: request.body.version,
											date:  curDate,
											comments: request.body.comments
										})

					newNotification.save(function(err){
						if(err)
							response.status(500).send()
						else
						{
							client.index({
								index: 'procedurecontent',
								type: 'String',
								id: procedure.pid,
								body: {							
									name: procedure.pname,
									content : S(procedure.data.content).stripTags().s
								}
							},function(err)
							  {
								if(!err)
								{
									client.index({
										index: 'procedurecontenthtml',
										type: 'String',
										id: procedure.pid,
										body: {							
											name: procedure.pname,
											content : S(procedure.data.content).s
										}
									},function(err){
										if(!err)
											response.send('ok');
										else
											response.status(500).send()
									})
								}
								else
									response.status(500).send()
							})
						}
					})
				}	
			})						
		}
	})
}

var getAllTrashProcedures = function(response){
	
	indexModel.find({trashed:true}, function(err, procedure){
	
		if(!err)
			response.send(procedure)
		else
			response.status(500).send({})
	})
}

var getTrashProcedure = function(request, response){

	indexModel.findOne({pid: request.params.id, trashed:true}, 'active_version', function(err, result){

		if(err || !result)
			response.status(500).send()
		else{
			
			artifactModel.findOne({pid: request.params.id, version:result.active_version, in_draft:false}, function(err, procedure){
				
				if(!err)
					response.send(procedure)
				else
					response.status(500).send({})
			})
		}
	})
}

var getActivityLog = function(request, response){

	notificationModel.find({}, function(err, result){

		if(err || !result)
			response.status(500).send()
		else
			response.send(result)
	})	
}


var search = function(request, response){

	client.search({
		  index: 'procedurecontent',
		  active: true,
		  trashed: false,
		  body: {
		    query: {
		      match: {
		        content: request.query.q
		      }
		    },
		  
		    highlight: {
		    	fields: {"content": {"number_of_fragments": 2}}
		    }

		  }
		}, function (error, result) {
			var obj = []
			if(error)
				response.status(500).send()

			for(i=0; i<result.hits.hits.length; ++i)
			{
				obj.push({id:result.hits.hits[i]._id, name:result.hits.hits[i]._source.name,  snippets: result.hits.hits[i].highlight.content})

			}
		  	response.send(obj)
	})	
}


var resolveLinks = function(request, response)
{
	client.search({
		  index: 'procedurecontenthtml',
		  body: {
		    query: {
		      match: {
		        content: request.query.id
		      }
		    },
		  highlight: {
		    	fields: {"content": {"number_of_fragments": 2}}
		    }

		  }
		}, function (error, result) {
			var obj = []
			if(error)
				response.status(500).send()

			console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
			for(i=0; i<result.hits.hits.length; ++i)
			{
				obj.push({id:result.hits.hits[i]._id, name:result.hits.hits[i]._source.name,  snippets: result.hits.hits[i].highlight.content})

			}

			response.send(obj)			
	})
}

exports.procedureExists = procedureExists
exports.draftExists = draftExists
exports.procedureorDraftExists = procedureorDraftExists
exports.submitDraftProcedure = submitDraftProcedure
exports.updateDraftProcedure = updateDraftProcedure
exports.getVersionIds = getVersionIds
exports.getAllDrafts = getAllDrafts
exports.getAllProcedures = getAllProcedures
exports.getDraft = getDraft
exports.getProcedure = getProcedure
exports.approveDraft = approveDraft
exports.rejectDraftProcedure = rejectDraftProcedure
exports.discardDraftProcedure = discardDraftProcedure
exports.removeProcedure = removeProcedure
exports.restoreProcedure = restoreProcedure
exports.revertProcedure = revertProcedure
exports.getTrashProcedure = getTrashProcedure
exports.getAllTrashProcedures = getAllTrashProcedures
exports.getActiveVersionNumber = getActiveVersionNumber
exports.getNonActiveVersion = getNonActiveVersion
exports.getActivityLog = getActivityLog
exports.search = search
exports.resolveLinks = resolveLinks
















