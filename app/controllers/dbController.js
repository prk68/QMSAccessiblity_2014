var elasticsearch = require('elasticsearch');
var procedureModel = require("../models/procedure").procedureModel;
var notificationModel = require("../models/procedure").notificationModel;
var client = new elasticsearch.Client({  host: 'localhost:9200',  log: 'trace'});
var S = require('string')

var addProcedureToDataBase = function(request, response)
{
	var newProcedure = new procedureModel(request.body.procedure);
	newProcedure.save(function (err) { 
		if (err) 
			response.send(501, 'could not be added in the db'); 

		else 
		{
			console.log("Added new procedure : " + newProcedure.pid);

			// Add content onto elastic search db
			console.log("Now adding content onto elastic db : " + newProcedure.pid);
			client.index({
				index: 'procedurecontent',
				type: 'String',
				id: newProcedure.pid,
				body: {
					
					name: newProcedure.versions[newProcedure.baseline].pname,
				    content : S(newProcedure.versions[newProcedure.baseline].content).stripTags().s
				 }
				}, 
				function(err){
					if(!err)
						console.log("Finished adding content onto elastic db : " + newProcedure.pid);
				}
			)

			client.index({
				index: 'procedurecontenthtml',
				type: 'String',
				id: newProcedure.pid,
				body: {
					name: newProcedure.versions[newProcedure.baseline].pname,
				    content : newProcedure.versions[newProcedure.baseline].content
				 }
				}, 
				function(err){
					if(!err)
						console.log("Finished adding content onto elastic db html: " + newProcedure.pid);
				}
			)

			//Add a entry in the notification database
			var newNotification = new notificationModel();
			newNotification.pid = newProcedure.pid
			newNotification.pname = newProcedure.versions[newProcedure.baseline].pname
			newNotification.type = "created"
			newNotification.author = newProcedure.versions[newProcedure.baseline].owner
			newNotification.date = new Date()
			newNotification.reviewer = newProcedure.versions[newProcedure.baseline].reviewer
			newNotification.old_version = -1
			newNotification.new_version = newProcedure.versions[newProcedure.baseline].nversion		
			newNotification.comments = newProcedure.versions[newProcedure.baseline].comments

			newNotification.save(function(err){
			if(err)
				response.send(501, 'could not be added in the db'); 
			else
				response.send('ok')

			})
		}
	});
}



var updateInDB = function(request, response)	
{
	var sentProcedure = request.body.procedure

	procedureModel.update({pid: sentProcedure.pid}, {baseline: sentProcedure.baseline, $push: {versions:sentProcedure.versions[sentProcedure.baseline]}},{upsert:true},function(err){
        if(err)
            console.log(err);
        else
        {
            console.log("Updated procedure : " + sentProcedure.pid);
        
            procedureModel.find({pid: sentProcedure.pid}, function(err, result){
           		if(!err)
            	{
            		client.index({
						index: 'procedurecontent',
						type: 'String',
						id: sentProcedure.pid,
						body: {							
							name: sentProcedure.versions[sentProcedure.baseline].pname,
						    content : S(sentProcedure.versions[sentProcedure.baseline].content).stripTags().s
						 }
						}, 
						function(err){
							if(!err)
								console.log("Finished adding content onto elastic db : " + newProcedure.pid);
					})

					client.index({
						index: 'procedurecontenthtml',
						type: 'String',
						id: newProcedure.pid,
						body: {							
							name: newProcedure.versions[sentProcedure.baseline].pname,
						    content : sentProcedure.versions[sentProcedure.baseline].content
						 }
						}, 
						function(err){
							if(!err)
								console.log("Finished adding content onto elastic db html: " + newProcedure.pid);
					})
            		  		
            	    //Add a entry in the notification database
					var newNotification = new notificationModel();
					newNotification.pid = sentProcedure.pid
					newNotification.pname = sentProcedure.versions[sentProcedure.orig_baseline].pname
					newNotification.type = "updated"
					newNotification.date = new Date()
					newNotification.author = sentProcedure.versions[sentProcedure.orig_baseline].owner
					newNotification.reviewer = sentProcedure.versions[sentProcedure.orig_baseline].reviewer
					newNotification.old_version = sentProcedure.versions[sentProcedure.orig_baseline].nversion
					newNotification.new_version = sentProcedure.versions[sentProcedure.baseline].nversion		
					newNotification.comments = sentProcedure.versions[sentProcedure.baseline].comments
					newNotification.save(function(err){
					if(err)
						response.send(501, 'could not be added in the db'); 
					else
						response.send('ok')
					})
				}
			})
        }
	});	
}



			
var getAllProcedures = function(res)
{	
	procedureModel.find({}, function(err, procedures) 
	{
		if (!err) 
		{
			results = []
			for(i=0; i<procedures.length; ++i)
				if(!procedures[i].trashed)
					results.push({pid:procedures[i].pid, pname: procedures[i].versions[procedures[i].baseline].pname, nversion:procedures[i].versions[procedures[i].baseline].nversion,
					 date_of_modification:procedures[i].versions[procedures[i].baseline].date_of_modification})
			
			res.send(results);			
		}

		else 
		{
			res.status(500).send('problem with database')
			console.log(err);
		}
	});
}

var getTrashedProcedures = function(res)
{	
	procedureModel.find({}, function(err, procedures) 
	{
		if (!err) 
		{
			results = []
			//console.log(procedures)
			for(i=0; i<procedures.length; ++i)
				if(procedures[i].trashed)
					results.push({pid:procedures[i].pid, pname: procedures[i].versions[procedures[i].baseline].pname, nversion:procedures[i].versions[procedures[i].baseline].nversion,
					 date_of_modification:procedures[i].versions[procedures[i].baseline].date_of_modification})
			
			//console.log(results)
			res.send(results);			
		}

		else 
		{
			res.status(500).send('problem with database')
			console.log(err);
		}
	});
}

var getProcedure =  function(id, res)
{
	console.log("getProcedureBody")
	console.log(id)
	procedureModel.find({pid: id}, function(err, result) {
		if (!err) {
			if(result.length == 0 || result[0].trashed)
				res.status(400).send("Does not exist")
			else
				res.send(result[0])
			console.log("sucess");
		} else {
			console.log(err);
		}
	});
}			

var getTrashedProcedure =  function(id, res)
{
	console.log("getProcedureBody")
	console.log(id)
	procedureModel.find({pid: id}, function(err, result) {
		if (!err) {
			console.log(result.length)
			if(result.length == 0 )
				res.status(400).send("Does not exist")
			else
				res.send(result[0])
			console.log("sucess");
		} else {
			console.log(err);
		}
	});
}

var deleteProcedure = function(request, response){
	console.log('delete procedure')
	console.log( request.body.pid)

	/*procedureModel.remove({}, function(err) { 
   		console.log('collection removed') 
		response.send('ok')
	});*/

	if(!request.body.pid)
		response.status(400).send('bad pid')
	else
	{
		procedureModel.update({pid: request.body.pid}, {trashed: true},{upsert:true},function(err){
	        if(err){
	            console.log(err);
	        	response.status(500).send('could not remove the procedure')
	        }
	        else
	        {
	            console.log("Trashed procedure : " + request.body.pid);
	           
	            //Add a entry in the notification database
				var newNotification = new notificationModel();
				newNotification.pid = request.body.pid
				newNotification.pname = request.body.pname
				newNotification.date = new Date()
				newNotification.type = "removed"
				newNotification.author = request.body.owner
				newNotification.comments = request.body.comments

				newNotification.save(function(err){
				if(err)
					response.send(501, 'could not be added in the db'); 
				else
					response.send('ok')
				})

				///Fish for dead links
				search({query:'/'+request.body.pid})

	        }
		});
	}
}


var restoreProcedure = function(request, response){

	if(!request.body.pid)
		response.status(400).send('bad pid')
	else
	{
		procedureModel.update({pid: request.body.pid}, {trashed: false},{upsert:true},function(err){
	        if(err){
	            console.log(err);
	        	response.status(500).send('could not restore the procedure')
	        }
	        else
	        {
	            console.log("restored procedure : " + request.body.pid);        
	             //Add a entry in the notification database
				var newNotification = new notificationModel();
				newNotification.pid = request.body.pid
				newNotification.pname = request.body.pname
				newNotification.date = new Date()
				newNotification.type = "restored"
				newNotification.author = request.body.owner
				newNotification.comments = request.body.comments
				
				newNotification.save(function(err){
				if(err)
					response.send(501, 'could not be added in the db'); 
				else
					response.send('ok')
				})


	        }
		});
	}	
}



var revertProcedure = function(request, response){

	if(!request.body.pid)
		response.status(400).send('bad pid')
	else
	{
		console.log(request.body.baseline)
		procedureModel.update({pid: request.body.pid}, {baseline: request.body.baseline},{upsert:true},function(err){
	        if(err){
	            console.log(err);
	        	response.status(500).send('could not restore the procedure')
	        }
	        else{
	            console.log("restored procedure : " + request.body.pid);        
	           //Add a entry in the notification database
				var newNotification = new notificationModel();
				newNotification.pid = request.body.pid
				newNotification.pname = request.body.pname
				newNotification.type = "reverted"
				newNotification.date = new Date()
				newNotification.author = request.body.owner
				newNotification.old_version = request.body.old_version
				newNotification.new_version = request.body.new_version		
				newNotification.comments = request.body.comments
				
				newNotification.save(function(err){
				if(err)
					response.send(501, 'could not be added in the db'); 
				else
					response.send('ok')
				})
	        }
		});
	}	
}

var search = function(request, response){

	client.search({
		  index: 'procedurecontent',
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

var searchHtml = function(query)
{

	client.search({
		  index: 'procedurecontent',
		  body: {
		    query: {
		      match: {
		        content: query
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

		  	return obj
	})
}


var getActivityLog =  function(req, res)
{
	console.log("activityLog")
	notificationModel.find({}, function(err, result) {
		if (!err) {
			res.status(200).send(result)
		} else {
			console.log(err);
			res.status(500).send("cannot deliver change log")
		}
	});
}

exports.getProcedure =  getProcedure;
exports.getTrashedProcedure =  getTrashedProcedure;
exports.getAllProcedures = getAllProcedures;
exports.getTrashedProcedures = getTrashedProcedures;
exports.addToDB = addProcedureToDataBase;
exports.deleteProcedure  =deleteProcedure
exports.restoreProcedure  =restoreProcedure
exports.updateInDB = updateInDB
exports.revertProcedure = revertProcedure
exports.search = search
exports.getActivityLog = getActivityLog