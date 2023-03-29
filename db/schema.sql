create database manager

use manager;
CREATE TABLE departments (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(30) not null,
);

use manager;
CREATE TABLE roles (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title VARCHAR(30) not null,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
foreign key(department_id) references departments(id)
);

use manager;
CREATE TABLE employees (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) not null,
last_name VARCHAR(30) not null,
role_id INT NOT NULL,
manager_id INT,
foreign key(role_id) references roles(id),
foreign key(manager_id) references employees(id)
);