
var procedureModel = require("../models/procedure").procedureModel;

var addProcedureToDataBase = function(request)
			{
				var newProcedure = new procedureModel(request.procedure);
							
				newProcedure.save(function (err) { 
									console.log("khaja"); 
									if (err) 
										console.log (err); 
									else 
										console.log("madatha");
									} );
				console.log("saved")
			}



var updateInDB = function(procedure)			{
				console.log('pname is ' + procedure.pname)		
				delete procedure._id					
				procedureModel.update({pid:procedure.pid}, procedure, {upsert: true}, function (err) { 
									console.log("khaja"); 
									if (err) 
										console.log (err); 
									else 
										console.log("madatha");
									} );
				console.log("saved")
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
		if(result instanceof Array)
			console.log(result.length)
		if (!err) {
			res.send(result[0])
			console.log("sucess");
		} else {
			console.log(err);
		}
	});
}			


var deleteProcedure = function(id, res){

	/*procedureModel.remove({}, function(err) { 
   		console.log('collection removed') 
	});*/


	console.log("delete")
	console.log(id)
	procedureModel.find({pid:id}).remove(function(err, result) {
		console.log("kittujii")
		if (!err) {
			res.send("ok");			
		} else {
			console.log(err);
		}
	});
}

exports.getProcedure =  getProcedure;
exports.getAllProcedures = getAllProcedures;
exports.addToDB = addProcedureToDataBase;
exports.deleteProcedure  =deleteProcedure
exports.updateInDB = updateInDB