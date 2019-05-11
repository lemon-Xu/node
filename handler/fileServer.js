const fs = require("fs");

function server(pathname, res){
	console.log(pathname)
	let path = "./public" + pathname
	fs.stat(path, function(err, stat){
		if(err) {
			if('ENOENT' == err.code) {
				res.statusCode = 404;
				res.end('Not Found');
			} else {
				res.statusCode = 500;
				res.end('Internal Server Error')
			}
		} else {
			res.setHeader('Content-Length', stat.size);
			let stream = fs.createReadStream(path);
			stream.pipe(res);
			stream.on('error',function(err){
				res.statusCode = 500;
				res.end('Internal Server Error')
			});
		}
	});
}

exports.server = server;