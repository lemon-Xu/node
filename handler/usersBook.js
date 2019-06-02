const mysql = require("../MySQL.js");
const cookie = require("cookie")

function server(method, para, response){
	response.setHeader('contentType', 'application/json');
	if(method == 'GET') {
		get(para, response)
	} else if (method == "POST") {
		post(para, response)
	}
}

function get(para, response){

}

function post(para, response){
	let way = para.way;
	let usersID = para.usersID;
	let bookID = para.bookID;
	let date = para.date;
	let price = para.price
	console.log('a');


	if(way == "insert"){ // 借书
		let sql = //"BEGIN; "
		 "INSERT INTO users_book_borrow(users_book_borrow_users_id, users_book_borrow_book_id, users_book_borrow_date) VALUES (?, ?, ?);"
		//+ "COMMIT; "
		let para = [usersID, bookID, date];
		mysql.query(sql, para, function(err, results){
			console.log(err)
			if(err){
				console.log("错误")
				response.writeHead(200);
				response.end('false')
				return;
			} else if(results != undefined){
				console.log(results);
				console.log("借书成功");
				response.writeHead(200);
				response.end('OK')	
			}
			
		});
		
	} else if(way == 'delete'){ // 还书
		let sql = //"BEGIN;"
		"DELETE FROM users_book_borrow WHERE users_book_borrow_book_id = ? and users_book_borrow_users_id = ?;" 
		//+ "UPDATE book SET book_is_loan = '0' WHERE book_id = ?;"
		let sql2 = "INSERT INTO users_book_return(users_book_return_users_id, users_book_return_book_id, users_book_return_date, users_book_return_price) VALUES (?, ?, '?', ?);"
		//+ "COMMIT;"
		let para = [bookID, usersID];
		let prar2 = [usersID, bookID, date, price];
		mysql.query(sql, para, function(err, results){
			if(err){
				response.writeHead(200);
				response.end('false')
			} else if(results != undefined){
				console.log(results)
				console.log("还书成功");
				response.writeHead(200);
				response.end('OK')
				mysql.query(sql2, para, function(err, results){
					if(err){
						console.log("归还错误");
					} else if(results != undefined) {
						console.log("归还成功");
					}
				})
			}
			
		});
		
	} else if(way == 'select'){ // 查询用户X所借未还图书
		let sql = "SELECT  book_name, book_press, book_author, book_price, users_book_borrow_date FROM book, users_book_borrow WHERE users_book_borrow_users_id = ? and book_id = users_book_borrow_book_id and users_book_borrow_book_id NOT IN (SELECT users_book_return_book_id FROM users_book_return WHERE users_book_return_users_id = ?);"
		let para = [usersID, usersID]
		mysql.query(sql, para, function(err, results){
			if(err){
				console.log(err)
			} else if (results != undefined){
				console.log(results)
				let books = JSON.stringify(results)
				response.writeHead(200,{'Content-Type':'application/json'})
				response.end(books);
			}
		});
	} else if(way == 'selectReturn'){
		console.log('selectReturn')
		let sql = "SELECT book_name, book_press, book_author, book_price, users_book_borrow_date, users_book_return_date, users_book_return_price  FROM book, users_book_return, users_book_borrow  WHERE book_id = users_book_return_book_id and book_id=users_book_borrow_book_id and users_book_borrow_users_id = ?;";
		let para = [usersID];
		mysql.query(sql, para, function(err, results){
			if(err){
				console.log(err);
			} else if (results != undefined){
				let books = JSON.stringify(results);
				response.writeHead(200, {'Content-Type':'application/json'});
				response.end(books);
			}
		});
	}
}




exports.server = server