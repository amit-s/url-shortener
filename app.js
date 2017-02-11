'use strict';

let express = require('express');
let app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req,res){

	res.send("looking good!!!");
	res.end();

});

app.listen(app.get('port'), function(){
	console.log(`Now listening on port ${app.get('port')}`);
});