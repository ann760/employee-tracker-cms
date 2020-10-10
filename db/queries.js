const con = require("./connection");

class Queries {
  constructor(con) {
    this.con = con;
  }

  // retuen all departments
  queryDeprt = () => {
    console.log("View Departments\n");
    const query = this.con.query(`SELECT * FROM departments`, function (err, res) {
      if (err) throw err;
      console.log(query.sql);
      // Show the departments
      renderScreen(`Departments`, res);
      promptDbOptions();
    });
  };

  queryRoles = () => {
    console.log("View Roles\n");
    const query = this.con.query(`SELECT * FROM roles`, function (err, res) {
      if (err) throw err;
      console.log(query.sql);
      // Show the roles
      renderScreen(`Roles`, res);
      promptDbOptions();
    });
  };

  queryEmployees = () => {
    console.log("View Employees\n");
    const query = this.con.query(`SELECT * FROM employee`, function (err, res) {
      if (err) throw err;
      console.log(query.sql);
      // Show the employee
      renderScreen(`Employee`, res);
      promptDbOptions();
    });
  };

  // queryEmployees = () => {
  //     const query = `
  //     SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name, concat(manager.first_name, " ", manager.last_name) AS manager_full_name
  //     FROM employee
  //     LEFT JOIN role ON employee.role_id = role.id
  //     LEFT JOIN department ON department.id = role.department_id
  //     LEFT JOIN employee as manager ON employee.manager_id = manager.id;`;
  //     connection.query(query, (err, res) => {
  //       if (err) throw err;
  //       renderScreen("Display all Employees", res);
  //       promptDbOptions();
  //     });
  //   }
} //end Queries class

module.exports = Queries;
