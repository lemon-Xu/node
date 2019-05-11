const fs = require("fs")
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
	let user = parameter["user"];
	let password = parameter["password"];
	let json = {
		"a": "登陆成功"
	};
	res.setHeader('Content-Type','text/plain;charset=UTF-8');
	res.write(JSON.stringify(json));
	res.end();
}

exports.server = server