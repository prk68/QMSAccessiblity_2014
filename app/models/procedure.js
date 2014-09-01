
var mongoose = require('mongoose')

var procedureSchema = new mongoose.Schema({
		pid : 	String,
		pname: 	String,		
		owner_name: String, 
		nversion: Number, 
		date_of_modification: Date,
		date_of_creation: Date,
		comments:			String,		
		
		role:	{pfl: Boolean, eng: Boolean, cmz: Boolean, ops: Boolean, sup: Boolean, qlty: Boolean},							 
		phase:		{incp: Boolean, elb: Boolean, constr: Boolean, beta: Boolean, cmz: Boolean},		
		center:   {abtc:Boolean, atc:Boolean, brgc:Boolean, mptc:Boolean, sntc:Boolean, ptc:Boolean},			
		questions: [String],				

		global:   Boolean,
		
		content:  String,
	});

var Procedure = mongoose.model('ProcedureSchema', procedureSchema);

exports.procedureModel = Procedure;