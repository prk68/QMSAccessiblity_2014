
var procedureModel = require("../models/procedure").procedureModel;

var addProcedureToDataBase = function(request, response)
{
	var newProcedure = new procedureModel(request.body.procedure);
	console.log(newProcedure)			
	newProcedure.save(function (err) { 
		if (err) 
			response.send(501, 'could not be added in the db'); 
		else 
		{
			console.log("Added new procedure : " + newProcedure.pid);
			response.send('ok')
		}
	});
}



var updateInDB = function(request, response)	
{
	var sentProcedure = request.body.procedure

	procedureModel.update({pid: sentProcedure.pid}, {baseline: sentProcedure.baseline, $push: {versions:sentProcedure.versions[sentProcedure.baseline]}},{upsert:true},function(err){
        if(err)
            console.log(err);
        else{
            console.log("Updated procedure : " + sentProcedure.pid);
        
            procedureModel.find({pid: sentProcedure.pid}, function(err, result){
            	if(!err)
            	{
            		console.log(result[0]);
            		response.send('ok');
            	}

            });

        }
	});	
}



			
var getAllProcedures = function(res){
	console.log("jitu jan")
	procedureModel.find({}, function(err, result) {
		console.log("kittujii")
		if (!err) {
			res.send(result);			
		} else {
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
			if(result.length == 0)
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
	        else{
	            console.log("Trashed procedure : " + request.body.pid);        
	            response.send('ok')
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
	        else{
	            console.log("restored procedure : " + request.body.pid);        
	            response.send('ok')
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
	            response.send('ok')
	        }
		});
	}	
}

exports.getProcedure =  getProcedure;
exports.getAllProcedures = getAllProcedures;
exports.addToDB = addProcedureToDataBase;
exports.deleteProcedure  =deleteProcedure
exports.restoreProcedure  =restoreProcedure
exports.updateInDB = updateInDB
exports.revertProcedure = revertProcedure