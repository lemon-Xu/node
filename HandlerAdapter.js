const path = require("path")
const url = require('url');
const util = require('util');
const querystring = require('querystring');

const HandlerMapping = require('./HandlerMapping.js');


function send(req, res){
	let reqStr = "";
	req.on('data', function(data) {
	    //数据分段传输，每个data都是数据的一部分
	    //传递大量数据时，可以用n来显示传递的次数
	    reqStr += data;
	});
	req.on('end', function() {
		let pathname = url.parse(req.url, true).pathname;
		console.log("pathname ",pathname);
		let handler = HandlerMapping.getHandler(pathname);  // 获得Handler处理程序名
 		var server = require("./handler/"+handler); // 注册程序

	    // 静态文件服务
		if(handler == "fileServer"){
			server.server(pathname, res);
			return;
		};

		if(handler == null) {
			res.write("404");
			res.end();
			return;
		} 

		let method = req.method;
		let parameter = "";

	    if(method == "GET"){
	    	// 多参没有测试
	    	let GET = url.parse(req.url, true).query;
	    	parameter = GET;
	    	console.log("解析GET: ",req.url,"\n",parameter);

	    } else if(method == "POST") {
	    	// 解析可能错误
	    	var post = querystring.parse(reqStr);
       		parameter = post;
       		console.log("解析POST:",parameter);
	    };  

		console.log("---------------")

		
		console.log("method: ",method," parameter: ", parameter);
		server.server(method, parameter, res);
	});  
}

exports.send = send