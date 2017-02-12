module.exports = function(app,db){

	app.route('/')
		.get(function(req,res){
			res.sendFile(process.cwd() + '/public/index.html');	
			db.collection('test').insert({
				name: 'Foo Bar',
				age: 25
			}, function(err){
				if(err){
					throw new Error("Error on inserting");
				}
			});
		});
}