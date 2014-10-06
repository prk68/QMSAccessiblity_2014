
var fs = require('fs');

var res_dir = 'D:/QMSAccessiblity_2014/public'; // your directory

var dbController = require('./controllers/dbController.js')
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret ="prithvi"
var ldap = require('ldapjs');
var baseDn = 'O=SLB,C=AN'
var ldap_opts= {filter:"", scope:'sub'}
var adminData = require('./admins.json'); 

var validUsers = [{uname:'qmsadmin1', pwd:'qmsadmin1'},{uname:'qmsadmin2', pwd:'qmsadmin2'},{uname:'qmsadmin3', pwd:'qmsadmin3'},{uname:'qmsadmin4', pwd:'qmsadmin4'},{uname:'qmsadmin5', pwd:'qmsadmin5'},]

function getExtension(filename) {
	
	var i = filename.lastIndexOf('.');
	return (i < 0) ? '' : filename.substr(i);
}


function getFileName(filename) {
	
	var i = filename.lastIndexOf('.');
	return (i < 0) ? '' : filename.substr(0, i);
}

function sendToken(alias, res)
{
	// We are sending the profile inside the token
  	var token = jwt.sign({uname:alias}, secret);

  	res.send({ token: token })
}


module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	app.get('/api/nerds', function(req, res) {
			// use mongoose to get all nerds in the database
			Nerd.find(function(err, nerds) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err);

				res.json(nerds); // return all nerds in JSON format
			});
		});
		
	
	
	
	/*app.get('/docs', function(req, res) {		
		
		fs.readdir(store_dir, function (e, files) {
			var fileNames = new Array();
			for(var i=0, j=0; i<files.length; i++){
				if(getExtension(files[i]) == '.htm' || getExtension(files[i]) == '.html'){
					fileNames[j] = {name: files[i], id: getFileName(files[i])}
					++j;
				}
			}
			res.send(fileNames);
		});
		
	});
		
	app.get('/store/:id', function(req, res) {
		console.log(req.params.id)
		//fs.readFile(store_dir+req.params.id+".htm", function(e, data){
		//	res.send(data);
		//});
		res.sendfile(store_dir+req.params.id+".htm");
	});*/
	

	app.get('/exists/:id', function(req, res) {
		dbController.procedureExists(req, res);
	});

	app.get('/admin/exists/all/:id', function(req, res) {
		dbController.procedureorDraftExists(req, res);
	});

	app.get('/admin/locked/:id', function(req, res) {
		dbController.draftExists(req, res);
	});

	app.get('/versions/:id', function(req, res) {
		dbController.getVersionIds(req, res);
	});



 /************************************************************* Draft management **********************************************/
	app.get('/admin/drafts', function(req, res) {
		dbController.getAllDrafts(res);
	});

	app.get('/admin/drafts/:id', function(req, res) {
		dbController.getDraft(req, res);
	});

	app.post('/admin/draft/submit', function(req, res) {
		dbController.submitDraftProcedure(req, res);
	});

	app.post('/admin/draft/update', function(req, res) {
		dbController.updateDraftProcedure(req, res);
	});

	app.post('/admin/approve', function(req, res){
		dbController.approveDraft(req, res);
	})

	app.post('/admin/reject', function(req, res){
		dbController.rejectDraftProcedure(req, res);
	})

	app.post('/admin/draft/remove', function(req, res){
		dbController.discardDraftProcedure(req, res);
	})
/**************************************************************************************************************************************/
	app.get('/procedures', function(req, res) {
		dbController.getAllProcedures(res);
	});

	app.get('/procedures/:id', function(req, res) {
		dbController.getProcedure(req, res);
	});

	app.get('/procedure/baseline/:id', function(req, res) {
		dbController.getActiveVersionNumber(req, res);
	});

	app.get('/admin/procedure/version', function(req, res) {
		dbController.getNonActiveVersion(req, res);
	});

/**************************************************************************************************************************************/
	
	app.get('/admin/list', function(req, res) {
		res.json(adminData);
	});	

/****************************  Remove, restore and revert actions  ***************************************************************************/
	


	app.get('/admin/procedures/trash', function(req, res) {
		dbController.getAllTrashProcedures(res);
	});	


	app.get('/admin/procedures/trash/:id', function(req, res) {
		dbController.getTrashProcedure(req, res);
	});

	
	app.post('/deleteProcedure', function(req, res) {
		dbController.removeProcedure(req, res);
	});

	app.post('/admin/revert', function(req, res) {
		dbController.revertProcedure(req, res);
	});

	app.post('/admin/restore', function(req, res) {
		dbController.restoreProcedure(req, res);
	});

	
	/***********************************************************************************************************************************/

	app.get('/activity', function(req, res) {
		dbController.getActivityLog(req, res);
	});

	app.get('/search', function(req, res) {
		console.log("search")
		dbController.search(req, res);
	});

	app.get('/searchHtml', function(req, res) {
		console.log("search")
		dbController.resolveLinks(req, res);
	});

	app.post('/admin/resolve/deadlinks', function(req, res) {
		dbController.resolveDeadLinks(req, res);
	});

	app.get('/deadlinks', function(req, res) {
		dbController.getDeadLinks(req, res);
	});

	app.post('/login', function(req, res) {

	//check in the list of meta users
	for(i=0; i<validUsers.length; ++i)
	{
		if ((req.body.username === validUsers[i].uname && req.body.password === validUsers[i].pwd)) {
			valid = true;
  		  	return sendToken(req.body.username, res)
		}
	}

	//check for zero length user name and pwd
	
	if(req.body.username.length <=1 || req.body.username.password <=1)
		res.send(401, 'invalid credentials')
		
	ldap_opts.filter = (('alias='+ req.body.username))

	var aliases = adminData.admins
	var validAdmin = false;

	for(i=0; i<aliases.length; ++i)
	{
		if(aliases[i].alias.toUpperCase() == req.body.username.toUpperCase())
		{
			validAdmin = true;
			break;
		}
	}	

	if(validAdmin == false)
	{
		res.send(401, 'could not authenticate');
		return;
	}

	var ldap_client = ldap.createClient({
  		url: 'ldap://ldap.slb.com:389'
	});

	//search
	ldap_client.search(baseDn, ldap_opts, function(err, result){
		console.log(baseDn)
		console.log(result)	
		console.log(err)

		if(err)
		{
			res.send(401, 'could not authenticate');
			return
		}

		result.on('error', function(err) {
			res.send(401, 'could not authenticate');
		});


		result.on('searchEntry', function(entry) {
			var dn = entry.object.dn
			// Try to bind and if sucess return authentication token
			ldap_client.bind(dn, req.body.password, function(err){
				if(err)
					res.send(401, 'could not authenticate');
				
				sendToken(req.body.username, res)
			})
		})
	
		res.on('error', function(err) {
			res.send(401, 'could not authenticate');
		});
			
	})	
})


	app.post('/images/upload', function(req, res){
		console.log(req.body.new_name)
		console.log(req.files.file.path)
		dbController.addImage(req.body.new_name, req.files.file.path, res)
	})

	app.get('/res/images', function(req, res){
		dbController.getAllImages(req, res)
	})

	app.get('/res/images/:id', function(req, res){
		dbController.getImage(req, res)
	})


	// frontend routes =========================================================

	//route to admin home page
	app.get('/admin', function(req, res) {
		console.log("cult of personality")
		res.sendfile('D:/QMSAccessiblity_2014/public/admin.html');
	});	


	app.get('/admin/*', function(req, res) {
		console.log("paul heyman guy")
		res.sendfile('D:/QMSAccessiblity_2014/public/admin.html');
	});

	// route to handle all angular requests
	app.get('*', function(req, res) {
		console.log("clobbering time")
		res.sendfile('D:/QMSAccessiblity_2014/public/index.html');
	});
	
	


};