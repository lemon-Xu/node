const fs = require("fs");

function fileServer(pathname, res){
	console.log(pathname);
	fs.stat(pathname, function(err, stat){
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
			let stream = fs.createReadStream(pathname);
			stream.pipe(res);
			stream.on('error',function(err){
				res.statusCode = 500;
				res.end('Internal Server Error')
			});
		}
	});
}

function privateFileServer(pathname, res) {
	let file = './private'+pathname;
	// console.log('私有文件服务',pathname, file);
	fileServer(file, res);
}

function publicFileServer(pathname, res) {
	let file = './public'+pathname;
	// console.log('静态文件服务',pathname, file);
	fileServer(file, res);
}
exports.privateFileServer = privateFileServer;
exports.publicFileServer = publicFileServer;