const fs = require("fs")
const fileServer = require("./fileServer");

var parameter = "";
var res = "";
function server(method, para, response){
	parameter = para;
	res = response;
	if(method == "GET") {
		GET();
	} else if(method == "POST"){
		POST();
	}
}

function GET(){

}

function POST(){
	console.log("用户登陆");
	let user = parameter["user"];
	let password = parameter["password"];
	if (user == "lemon" && password == 123)
		fileServer.server('/practice/home.html', res);
}

exports.server = server