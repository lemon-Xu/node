const path = require("path")
const url = require('url');
const util = require('util');
const querystring = require('querystring');

const HandlerMapping = require('./HandlerMapping.js');
const fileServer = require('./fileServer.js');
const cookie = require("cookie");

function send(req, res){
	let method = req.method;
	let pathname = url.parse(req.url, true).pathname;
	console.log(url.parse(req.url, true));
	let handler = HandlerMapping.getHandler(pathname); // 获得Handler处理程序名
	let parameter = "";

	console.log("handler",handler,"  pathname:",pathname,"  server:","./handler/"+handler);
	// 静态文件服务
	if(handler == "fileServer"){
		// console.log("请求静态文件服务-------");
		fileServer.publicFileServer(pathname, res);
		return;
	} 
	let server = require("./handler/"+handler); // 注册handler
	if(method == "GET"){
		// 多参没有测试
		let GET = url.parse(req.url, true).query;
	    parameter = setParameter(GET)
	    //parameter['cookie'] = req.headers.cookie;
	    console.log("解析GET: ",req.url,"\n",parameter);
	    console.log("---------------Handler----------")	
	    server.server(method, parameter, res);
	} else if (method == "POST"){
		let body = "";
		req.on('data', function(chunk) {
			body += chunk;
		});
		req.on('end', function() {
			// 解析可能错误
	    	var post = JSON.parse(body);
	    	console.log(post)
       		parameter =  setParameter(post);
       		//parameter['cookie'] = req.headers.cookie;
       		console.log("解析POST:",parameter); 
       		console.log("---------------Handler----------")	
       		server.server(method, parameter, res);
		});
		
	}
	
	  
}

function setParameter(parameter){
	let param= {};
	for(key in parameter){
		param[key] = parameter[key];
	}
	console.log(param)
	return param;
}

exports.send = send