'use strict';

let express = require('express');
let mongo = require('mongodb').MongoClient;
let routes = require(__dirname + '/app/routes/index.js');

let app = express();
app.set('views', './views');
app.set('view engine', 'pug');

let mongoURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/urlshortener';

mongo.connect(mongoURL, function(err,db){

	if(err){
		throw new Error('Failed to connect to database...');
	}else{
		console.log('Successfully connected to databse on port 27017');
	}

	app.set('port', (process.env.PORT || 3000));
	app.use('/css', express.static(__dirname + '/public/css'));
	app.db = db;

	routes(app,db);	
	
	app.listen(app.get('port'), function(){
		console.log(`Now listening on port ${app.get('port')}`);
	});
});