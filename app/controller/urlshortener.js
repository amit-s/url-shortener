exports.handleURL = function(req,res,next){

	let original_url = req.params[0];
	let hostname = req.headers.host;
	let db = req.app.db;

	let cursor = db.collection('links').find({});
			let projection = {_id: 0, original_url: 1, short_url: 1, short_path:1};			
			cursor.project(projection);
			
			cursor.toArray(function(err,docs){
				if(err) throw err;

				let original_url_list = docs.map(function(doc){
					return doc.original_url;
				});

				let short_path_list = docs.map(function(doc){
					return doc.short_path;
				});

				let existing_link_position = original_url_list.indexOf(original_url);


				if((docs.length<1)||(existing_link_position == -1)){
					let short_path = createShortPath(short_path_list);					
					let short_url = `${hostname}/${short_path}`;
					
					
					db.collection('links').insert({original_url, short_url, short_path},function(err){
						if (err) throw err;
						console.log(`new url ${original_url} added to DB`);
						res.json({original_url, short_url});
					});
				}else{
				console.log('here');
				let doc = docs[existing_link_position];				
				res.json({original_url: doc.original_url, short_url: doc.short_url});
				}				
			});			
}

createShortPath =  function(list){
	let short = 1234;
	while(list.indexOf(short) != -1){
		short = Math.floor(Math.random()*8999 + 1000);		
	}
	return short;	
}

exports.validateURL =  function (url){	
	let urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	return urlRegex.test(url);
}






