USE employee_cms;

INSERT INTO departments
    (dept_name)
VALUES
    ('Pre-school'),
    ('Recreational'),
    ('Competitive'),
    ('Human Resources'),
    ('Marketing'),
    ('Facilities'),
    ('Billing');

INSERT INTO roles
    (title, salary, dept_id)
VALUES
    ('Owner', 55000, 4),
    ('Biller', 35000, 7),
    ('Handyman', 30000, 4),
    ('Marketer', 30000, 6),
    ('Team Coach', 55000, 3),
    ('Conditioning Coach', 55000, 3),
    ('Head Coach', 70000, 3),
    ('Rec Coach', 25000, 2),
    ('Rec Manager', 65000, 2),
    ('Pre Coach', 25000, 5),
    ('Pre Manager', 65000, 4)
    ;


INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Ann-Marie', 'Orozco', 1, null),
    ('Laurie', 'Hernadez', 2, 1),
    ('Nadia', 'Comaneci', 4, 1),
    ('Sam', 'Milulak', 3, 1),
    ('Simone', 'Biles', 6, 7),
    ('Shannon', 'Miller', 9, 7),
    ('Dominque', 'Daws', 8, 9),
    ('Liukin', 'Nastia', 10, 11),
    ('Kerri', 'Shrug', 11, 7)
    ;