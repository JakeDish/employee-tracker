use manager;
INSERT INTO departments (name)
values ("HR"),
("Customer service"),
("QA");

INSERT INTO roles (title, salary, department_id)
values ("Analyst", 35000.00, 3),
("Supervisor", 40000.00, 2),
("Rep", 50000.00, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
values ("John", "Smith", 3, NULL),
("Jane", "Johnson", 2, NULL),
("Kelly", "Jones", 1, 2);
