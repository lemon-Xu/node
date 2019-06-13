const mysql = require('mysql');
const pool = mysql.createPool({
	connectionLimit: 4,
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'book'
});


function query(sql, param, callback){
	let SQL = 
	pool.getConnection(function(err, connection){
		if(err){
			console.log('-------------数据库连接池  获取连接失败--------------');
			console.log(err);
			console.log('-------------数据库连接池  获取连接失败  end--------------');
		}
		connection.query(sql, param, function(error, results, fields){
			if(error){
				console.log("--------------数据库连接池  查询失败-------------------");
				console.log(error);
				console.log("--------------数据库连接池  查询失败  end-------------------");
			}
			connection.release();
			callback(error, results, fields)
		});
	})
}

query("SELECT COUNT(*) FROM users WHERE users_id = ?",['1'], function(err, results){
	console.log(results[0]['COUNT(*)'] == 1);
})

function replace$(str, param){
	console.log("input:",str,"\n",param);
	let retStr = ""
	for(k in param) {
		let reg = "\\$\\{"+k+"\\}"
		let regExp = new RegExp(reg,'g');
		retStr = str.replace(regExp, '"'+param[k]+'"');
		str = retStr;	
	}
	console.log("output:",retStr);
	return retStr;
}

exports.query = query