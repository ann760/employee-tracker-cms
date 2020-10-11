const connection = require("./connection");

class Queries {
  constructor(con) {
    this.con = connection;
  }

//   // retuen all departments
//   queryDeprt = () => {
//     console.log("View Departments\n");
//     const query = `SELECT * FROM departments;`;
//     this.con.query(query, (err, res) => {
//       if (err) throw err;
//       // Show the departments
//       displyResult(`Departments`, res);
//       promptDbOptions();
//     });
//   };

//   queryRoles = () => {
//     console.log("View Roles\n");
//     const query = `SELECT * FROM roles;`;
//     con.query(query, (err, res) => {
//       if (err) throw err;
//       console.log(query.sql);
//       // Show the roles
//       displyResult(`Roles`, res);
//       promptDbOptions();
//     });
//   };

//   queryEmployees = () => {
//     const query = `
//         SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS department_name, concat(manager.first_name, " ", manager.last_name) AS manager_full_name
//         FROM employees
//         LEFT JOIN roles ON employees.role_id = roles.id
//         LEFT JOIN departments ON departments.id = roles.dept_id
//         LEFT JOIN employees as manager ON employees.manager_id = manager.id;`;
//     con.query(query, (err, res) => {
//       if (err) throw err;
//       displyResult("Employees", res);
//       promptDbOptions();
//     });
//   };
} //end Queries class

module.exports = Queries;
