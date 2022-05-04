use employeetrack_db

INSERT INTO department (name)
VALUES  ('Management'),
        ('Engineering'),
        ('Sales');
        

INSERT INTO role (title, salary, department_id)
VALUES  ('Manager', '1000000', 1),
        ('Lead', '150000', 2),
        ('Engineer', '100000', 2 ),
        ('Associate', '60000', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Willie', 'Washington', 1, 1),
        ('Chaz', 'Chesterfield', 2, null),
        ('Leon', 'Lambert', 2, null),
        ('Nino', 'Numminen', 3, null );

