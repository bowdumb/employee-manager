-- This file contains our seed data which makes it easier to troubleshoot issues as well as demonstrate functionality.
INSERT INTO department(name)
VALUES ('SALES'),
('ENGINEER'),
('LEGAL'),
('HR');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Josh', 'Claxton',1,4),
('Danny', 'Mixon',2,3),
('Steve', 'McQueen',3,1),
('MC', 'Hammer',4,2);

INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', '95000', 1),
('Lead Engineer', '190000', 2),
('Attorney', '125000', 3),
('HR Manager', '90000', 4);
