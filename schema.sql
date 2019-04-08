### Schema
CREATE DATABASE friendfinder_db;
USE friendfinder_db;

CREATE TABLE profiles
(
	id int NOT NULL AUTO_INCREMENT,
	name VARCHAR(25),
   photo VARCHAR(255),
   scores VARCHAR(25),
   PRIMARY KEY (id)
);
