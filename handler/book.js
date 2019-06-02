const mysql = require('../MySQL.js');
const cookie = require('cookie');

function server(methods, para, response){
	response.setHeader('Content-Type', 'application/json')
	if(methods == 'GET') {
		GET(para, response);
	} else if(methods == 'POST'){
		POST(para, response);
	}
}


function GET(para, response){

}

function POST(para,response){
	let way = para.way;
	let decide = para.decide;
	let decidePara = para.decidePara;
	if(way == 'select'){
		if(decide == 'isLoan') {
			let sql = "SELECT * FROM book";
			let para = [decidePara]


			mysql.query(sql, para, function(err, results){
				if(err){
					response.writeHead(200);
					response.end('false')
				} else if(results != undefined){
					console.log(results);
					response.end(JSON.stringify(results))
				}
			});
		}
		
	}
}




exports.server = server;