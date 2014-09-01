
var fs = require('fs');

//var store_dir = 'C:/Bitnami/starter-node-angular-master/app/store/'; // your directory

var dbController = require('./controllers/dbController.js')
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret ="prithvi"
var ldap = require('ldapjs');
var ldap_client = ldap.createClient({
  url: 'ldap://ldap.slb.com:389'
});
var baseDn = 'O=SLB,C=AN'
var ldap_opts= {filter:"", scope:'sub'}


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
  	var token = jwt.sign({uname:alias}, secret, { expiresInMinutes: 10 });

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
	
	
	app.post('/procedure/add', function(req, res) {
		dbController.addToDB(req.body);
		res.send({status:"ok"})
	});
	
	
	app.post('/procedure/update', function(req, res) {
		dbController.updateInDB(req.body.procedure);
		res.send({status:"ok"})
	});


	app.get('/procedures/all', function(req, res) {
		dbController.getAllProcedures(res);
	});	


	app.get('/procedure/:id', function(req, res) {
		console.log("hoeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
		dbController.getProcedure(req.params.id, res);
	});

	app.post('/deleteProcedure', function(req, res) {
		console.log("jigaaaaaaaaaa")
		console.log(req.body)
		dbController.deleteProcedure(req.body.id, res);
	});

	app.post('/login', function(req, res) {

	//check in the list of meta users
	for(i=0; i<validUsers.length; ++i)
	{
		if ((req.body.username === validUsers[i].uname && req.body.password === validUsers[i].pwd)) {
			valid = true;
  		  	sendToken(req.body.username, res)
			break;
  		}
	}

	//check for zero length user name and pwd
	
	if(req.body.username.length <=1 || req.body.username.password <=1)
		res.send(401, 'invalid credentials')
		
	ldap_opts.filter = (('alias='+ req.body.username))

	//search
	ldap_client.search(baseDn, ldap_opts, function(err, result){
		
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