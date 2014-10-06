// modules =================================================
var express = require('express');
var app     = express();
var mongoose= require('mongoose');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "prithvi"

// configuration ===========================================
	
// config files
//var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 					// log every request to the console
	app.use(express.bodyParser({uploadDir:'./public/res'})); 						// pull information from html in POST
	app.use(express.methodOverride()); 					// simulate DELETE and PUT
  app.use('/deleteProcedure', expressJwt({secret: secret}));
  app.use('/procedure/add', expressJwt({secret: secret}));
  app.use('/procedure/update', expressJwt({secret: secret}));
  app.use('/admin/*', expressJwt({secret: secret}));
});

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/HelloMongoose2';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 8080;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
global.db = mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  //console.log(mongoose.connection);
  console.log(mongoose.connection.host);
  console.log(mongoose.connection.port);
  }
});
