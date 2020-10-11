// import
//const mysql = require("mysql2");
const express = require("express");
const inquirer = require("inquirer");
const consosT = require("console.table");
const con = require("./db/connection");
const Queries = require("./db/Queries");
const { query } = require("./db/connection");

// port
const PORT = process.env.PORT || 3001;
// app express
const app = express();
// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// select a managament option on the db
const promptDbOptions = () => {
  // let dbAction = {
  return (
    inquirer
      .prompt([
        {
          type: "list",
          name: "dbOption",
          message: "What would you like to do? (Required)",
          choices: [
            "View Departments",
            "Add a Department",
            "View Roles",
            "Add a Role",
            "View all Employees",
            "View all Employees by Manager",
            "View all Employees by Role",
            "Add an Employee",
          ],
        },
      ])

      // return inquirer.prompt(dbAction)
      .then((answer) => {
        //console.log(answer.dbOption);
        switch (answer.dbOption) {
          case "View Departments":
            queryDeprt();
            break;
          case "View Roles":
            queryRoles();
            break;
          case "View All Employees":
            queryEmployees();
            break;
        }
      })
  );
  //.then( () => con.end());
};

queryDeprt = () => {
  const query = `SELECT * FROM departments`;
  con.query(query, (err, res) => {
    if (err) throw err;
    // Show the departments
    displyResult(`Departments`, res);
    promptDbOptions();
  });
};

queryRoles = () => {
  const query = `SELECT * FROM roles;`;
  con.query(query, (err, res) => {
    if (err) throw err;
    // Show the roles
    displyResult(`Roles`, res);
    promptDbOptions();
  });
};

queryEmployees = () => {
  const query = con.query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS department_name, concat(manager.first_name, " ", manager.last_name) AS manager_full_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON departments.id = roles.dept_id
    LEFT JOIN employees as manager ON employees.manager_id = manager.id`,
  function (err, res) {
    if (err) throw err;
    displyResult("Employees", res);
    promptDbOptions();
  });
  console.log(query.sql);
};


queryRoles = () => {
  const query = con.query("INSERT INTO roles SET ?",
  {
    title: answer.title,
    salary: answer.salary,
    dept_id: answer.depatment,
  },
  function (err, res) {
    if (err) throw err;
    // Show the roles
    displyResult(`New Role`, res);
    promptDbOptions();
  });
};

function displyResult(heading, data) {
  console.clear();
  console.table(heading, data);
}
promptDbOptions();
// .then(console.log(choice));
