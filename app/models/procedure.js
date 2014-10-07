
var mongoose = require('mongoose')

/****************************************************************************************************************************************************************************/


var indexSchema = new mongoose.Schema({

	pid: String,
	pname: String,
	active_version: Number,
	trashed: Boolean,
	date_of_modification: Date,
	tags: [String]
})

var indexModel = mongoose.model('index', indexSchema)

/****************************************************************************************************************************************************************************/

var artifactSchema = new mongoose.Schema({

	pid: String,
	pname: String,
	version: Number,
	active: Boolean,
	date_of_modification: Date,
	mappings : {
					role: 		{pfl: Boolean, eng: Boolean, cmz: Boolean, ops: Boolean, sup: Boolean, qlty: Boolean},
					phase:		{incp: Boolean, elb: Boolean, constr: Boolean, beta: Boolean, cmz: Boolean},		
					center:     {abtc:Boolean, atc:Boolean, brgc:Boolean, htc:Boolean, mptc:Boolean, sntc:Boolean, ptc:Boolean},	
					global: 	Boolean,		
					questions:  [String]
				},

	tags: [String],
	metaData : { owner: String, reviewer: String, comments: String},
	data     : { content: String},
	trashed: Boolean,
	in_draft: Boolean,
	draft_type: String, 
	rejected: Boolean, 
	rejections: [String],
	path: String,
})

var artifactModel = mongoose.model('artifact', artifactSchema)
/****************************************************************************************************************************************************************************/



var notificationSchema = new mongoose.Schema({

	pid : 	String,
	pname :  String,
	type:  String,
	author: String,
	reviewer: String,
	date: Date,
	comments: String,
	version: Number,	
});

var notificationModel = mongoose.model('notification', notificationSchema)

/****************************************************************************************************************************************************************************/
var imgSchema = new mongoose.Schema({

	name : 	String,
	date: Date,
	path: String	
});

var imageModel = mongoose.model('image', imgSchema)




exports.indexModel = indexModel
exports.artifactModel = artifactModel
exports.notificationModel = notificationModel
exports.imageModel = imageModel