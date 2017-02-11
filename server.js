'use strict';

let express = require('express');
let routes = require(__dirname + '/app/routes/index.js');
let app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/css', express.static(__dirname + '/public/css'));

routes(app);

app.listen(app.get('port'), function(){
	console.log(`Now listening on port ${app.get('port')}`);
});