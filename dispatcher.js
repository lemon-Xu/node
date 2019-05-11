const http = require('http');

const HandlerAdapter = require('./HandlerAdapter.js');


http.createServer(function(req, res){
	
	let ret =  HandlerAdapter.send(req, res);
	console.log("收到一个请求");
	



}).listen(8000);

console.log("server in 8000");

