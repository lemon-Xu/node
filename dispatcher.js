const http = require('http');

const HandlerAdapter = require('./HandlerAdapter');


http.createServer(function(req, res){
	console.log("收到一个请求");
	let ret =  HandlerAdapter.send(req, res);
	
	



}).listen(8000);

console.log("server in 8000");

