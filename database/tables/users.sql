CREATE TABLE users (
	_id varchar(100) NOT NULL PRIMARY KEY,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	email varchar(250) NOT NULL,
	age INT NOT NULL,
	isDeleted BIT NOT NULL,
	password varchar(250) NOT NULL,
)