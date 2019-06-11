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

	if(way == 'select'){ // 查询
		if(decide == 'all') {
			if(decidePara == "激活"){
				let sql = "SELECT * FROM book WHERE book_status = '激活'";
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
			if(decidePara == "null"){
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
	} else if(way == 'update'){ // 更新
		let usersID = para.usersID;
		let bookID = para.bookID;

		if(decide == 'ban') {

			let sql = "UPDATE book SET book_status = '禁止' WHERE book_id = ? and book_status = '激活' ;";
			let para = [bookID];

			mysql.query(sql, para, function(err, results){
				if(err){
					console.log(err);
					response.writeHead(200,{'Content-Type':'application'});
					response.end('err')
				} else if(results != undefined && results['changedRows'] == 1){
					console.log(results);
					response.writeHead(200,{'Content-Type':'application/json'});
					response.end('OK')
				} else {
					response.writeHead(200,{'Content-Type':'application'});
					response.end('失败')
				}
			});
		} else if(decide == 'active') {

			let sql = "UPDATE book SET book_status = '激活' WHERE book_id = ? and book_status = '禁止' ;";
			let para = [bookID];
			mysql.query(sql, para, function(err, results){
				if(err){
					console.log(err);
					response.writeHead(200,{'Content-Type':'application'});
					response.end('err')
				} else if(results != undefined && results['changedRows'] == 1){
					console.log(results);
					response.writeHead(200,{'Content-Type':'application/json'});
					response.end('OK')
				} else {
					response.writeHead(200,{'Content-Type':'application'});
					response.end('失败')
				}
			})
		}
	}
}




exports.server = server;