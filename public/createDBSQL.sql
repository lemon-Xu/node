-- 数据库初始化SQL
/*
2019-5-22
用户表
lemon
*/
CREATE TABLE users(
	users_id	INT  PRIMARY KEY AUTO_INCREMENT, # 用户编号
	users_name	VARCHAR(20) NOT NULL, # 用户名
	users_password	CHAR(128) NOT NULL,	 # 密码
	users_status	VARCHAR(10) NOT NULL,	# 身份
	users_gender	ENUM('男', '女')  NOT NULL DEFAULT('男') # 性别
);

INSERT INTO users(users_name, users_password, users_status, users_gender) VALUES
 	('lemon', MD5('123'), '1', '男'),
	('lemon2', MD5('123'), '2', '女');
	('lemon3', MD5('lemOn123'), '2', '女');

SELECT * FROM users


/*
2019-5-22
图书表
lemon
*/
CREATE TABLE book(
	book_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT , # 图书编号
	book_name VARCHAR(12) NOT NULL UNIQUE, # 书名
	book_press VARCHAR(20) NOT NULL,	# 出版社
	book_author VARCHAR(20) NOT NULL, # 作者
	book_price FLOAT NOT NULL, # 单价
	book_status ENUM('激活', '禁止') DEFAULT('激活');  # 状态
);




INSERT INTO book (book_name, book_press, book_author, book_price)
	VALUES  ('Java编程实践', '机械工业出版社', '歪果仁', 0.7),
			    ('nodeJS深入浅出', '人民邮电出版社', '朴灵', 0.65);

INSERT INTO book (book_name, book_press, book_author, book_price, book_is_loan)
	VALUES  ('大学英语', '上海交通大学出版社', '国人', 0.40)


/*
2019-5-22
用户_图书_借阅表
lemon
*/
CREATE TABLE users_book_borrow(
	users_book_borrow_users_id	int ,
	users_book_borrow_book_id	int,
	users_book_borrow_date	date NOT NULL,

	CONSTRAINT fk_usersBookBorrow_users_on_usersBookBorrowUsersId 
		FOREIGN KEY(users_book_borrow_users_id) REFERENCES users(users_id),
	
	CONSTRAINT fk_usersBookBorrow_book_on_usersBookBorrowBookId
		FOREIGN KEY(users_book_borrow_book_id) REFERENCES book(book_id),

	PRIMARY KEY (users_book_borrow_users_id, users_book_borrow_book_id, users_book_borrow_date)
);

INSERT INTO users_book_borrow(users_book_borrow_users_id, users_book_borrow_book_id, users_book_borrow_date) VALUES
	(1,1, "2018-4-15"),
	(2,2, "2018-5-15");


/*
2019-5-22
用户_图书_还书表
lemon
*/
CREATE TABLE users_book_return(
	users_book_return_users_id	int,
	users_book_return_book_id	int,
	users_book_return_borrow_date date NOT NULL,
	users_book_return_date	date NOT NULL,
	users_book_return_price float NOT NULL,

	CONSTRAINT fk_usersBookReturn_users_on_usersBookReturnUsersId 
		FOREIGN KEY(users_book_return_users_id) REFERENCES users(users_id),
	
	CONSTRAINT fk_usersBookReturn_book_on_usersBookReturnBookId
		FOREIGN KEY(users_book_return_book_id) REFERENCES book(book_id),

	PRIMARY KEY (users_book_return_users_id, users_book_return_book_id, users_book_return_date)
);



INSERT INTO users_book_return(users_book_return_users_id, users_book_return_book_id, 
	users_book_return_date, users_book_return_price, users_book_return_borrow_date) VALUES
	(2, 2, '2019-10-12', 120, '2019-5-12');


-- 复杂查询语句 经过测试无误

-- 查询2用户所借未还图书
SELECT  book_id, book_name, book_press, book_author, book_price, users_book_borrow_date FROM book, users_book_borrow 
	WHERE users_book_borrow_users_id = 2 and book_id = users_book_borrow_book_id 
	and (users_book_borrow_book_id, users_book_borrow_users_id , users_book_borrow_date) 
		NOT IN (SELECT users_book_return_book_id, users_book_return_users_id, users_book_return_borrow_date FROM users_book_return WHERE users_book_return_users_id = 2);

-- 查询用户所借未还图书
SELECT users_name, book_name, users_book_borrow_date, book_price FROM users, book, users_book_borrow  
	WHERE users_id = users_book_borrow_users_id and book_id = users_book_borrow_book_id 
		and (users_book_borrow_book_id, users_book_borrow_users_id , users_book_borrow_date) 
	NOT IN (SELECT users_book_return_book_id, users_book_return_users_id, users_book_return_borrow_date FROM users_book_return);


-- 查询2用户归还图书
SELECT book_name, book_press, book_author, book_price, users_book_return_borrow_date ,users_book_return_date, users_book_return_price  FROM book, users_book_return 
WHERE book_id = users_book_return_book_id and users_book_return_users_id = 2;

-- 查询用户归还图书
SELECT users_name, book_name,users_book_return_borrow_date, users_book_return_date, users_book_return_price FROM users, book, users_book_return 
	WHERE book_id = users_book_return_book_id and users_id = users_book_return_users_id