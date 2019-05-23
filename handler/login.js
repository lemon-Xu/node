const fs = require("fs")
const fileServer = require("../fileServer");
const mysql = require("../MySQL.js")


function server(method, para, response){

	if(method == "GET") {
		GET(method, para, response);
	} else if(method == "POST"){
		POST(method, para, response);
	}
}

function GET(method, para, response){
	fileServer.publicFileServer('/login.html', response);
}

function POST(method, para, response){
	console.log("用户登陆");
	let user = para["user"];
	let password = para["password"];
	let sql = "SELECT count(*) FROM users WHERE users_name = ? and users_password = MD5(?)";
	let p = [user, password];
	mysql.query(sql, p, function(error, results, fields){
		console.log(results[0])
		if(results[0]['count(*)'] == 1){
			console.log("用户",user,"登入");
			fileServer.privateFileServer('/practice/home.html', response);
		}
		else{
			console.log('登入失败')
		}
	})
	
}

exports.server = server