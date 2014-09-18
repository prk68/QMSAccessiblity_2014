
var mongoose = require('mongoose')


var procedureVersion = new mongoose.Schema({
		
	pname: 	String,		
	owner: String, 
	reviewer: String,
	date_of_modification: Date,
	comments:			String,		
			
	role:	{pfl: Boolean, eng: Boolean, cmz: Boolean, ops: Boolean, sup: Boolean, qlty: Boolean},							 
	phase:		{incp: Boolean, elb: Boolean, constr: Boolean, beta: Boolean, cmz: Boolean},		
	center:   {abtc:Boolean, atc:Boolean, brgc:Boolean, htc:Boolean, mptc:Boolean, sntc:Boolean, ptc:Boolean},			
	questions: [String],				

	global:   Boolean,
		
	content:  String,
	nversion: Number,					
});




var procedureSchema = new mongoose.Schema({

	pid : 	String,
	trashed :  Boolean,
	baseline : Number,
	versions : [procedureVersion],					
});

var draftProcedureSchema =  new mongoose.Schema({
	
	procedure : [procedureSchema],
	rejections : [String]				
});




var notificationSchema = new mongoose.Schema({

	pid : 	String,
	pname :  String,
	type:  String,
	author: String,
	reviewer: String,
	date: Date,
	comments: String,
	old_version: Number,
	new_version: Number,
});




var ProcedureVersion =  mongoose.model('ProcedureVersionSchema', procedureVersion);
var Procedure = mongoose.model('ProcedureSchema', procedureSchema);
var notification = mongoose.model('NotificationSchema', notificationSchema);
var draftProcedure = mongoose.model('draftProcedureSchema', draftProcedureSchema);

exports.procedureModel = Procedure
exports.procedureVersionModel = ProcedureVersion
exports.notificationModel = notification
exports.draftProcedureModel =  draftProcedure
