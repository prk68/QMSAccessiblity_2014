


var procedureVersion = new mongoose.Schema({
	
	owner: String, 
	reviewer: String,
	date_of_modification: Date,
	comments:			String,		
			
	role:	{pfl: Boolean, eng: Boolean, cmz: Boolean, ops: Boolean, ops: Boolean, qlty: Boolean},							 
	phase:		{incp: Boolean, elb: Boolean, constr: Boolean, beta: Boolean, cmz: Boolean},		
	center:   {abtc:Boolean, atc:Boolean, brgc:Boolean, htc:Boolean, mptc:Boolean, sntc:Boolean, ptc:Boolean},			
	questions: [String],				

	global:   Boolean,
		
	content:  String,
	nversion: Number,					
});




var procedureSchema = new mongoose.Schema({

	pid : 	String,
	pname: 	String,	
	trashed :  Boolean,
	baseline : Number,
	versions : [procedureVersion],	

	rejections : [String],				
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
var draftProcedure = mongoose.model('draftProcedureSchema', procedureSchema);
var notification = mongoose.model('NotificationSchema', notificationSchema);

exports.procedureVersionModel = ProcedureVersion
exports.procedureModel = Procedure
exports.notificationModel = notification