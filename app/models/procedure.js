
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

var ProcedureVersion =  mongoose.model('ProcedureVersionSchema', procedureVersion);
var Procedure = mongoose.model('ProcedureSchema', procedureSchema);

exports.procedureModel = Procedure;
exports.procedureVersionModel = ProcedureVersion;