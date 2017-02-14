let api = require(process.cwd() + '/app/controller/api.js');

module.exports = function(app,db){

	app.route('/')
		.get(function(req,res){
			res.render('index.pug');
		});

	app.route('/*')
		.get(function(req,res, next){
						
			if(req.params[0].slice(0,3) == 'new'){
				return next();
			}
			//console.log(req.params[0]);
			api.handleShortURL(req,res,next);

		});

	app.route('/new/*')
		.get(function(req,res,next){
			let original_url = req.params[0];			
			
			if(!api.validateURL(original_url)){
				res.end("Please enter a valid URL");
				return next();
			}

			api.handleURL(req,res,next);			
		});
}
