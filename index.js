// import
//const mysql = require("mysql2");
const express = require("express");
const inquirer = require("inquirer");
const cTable = require("console.table");
const con = require("./db/connection");

const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render())

const deptID = [];

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
            "View Employees by Manager",
            "View Employees by Role",
            "Add an Employee",
            "Done",
          ],
        },
      ])

      // return inquirer.prompt(dbAction)
      .then((answer) => {
        switch (answer.dbOption) {
          case "View Departments":
            viewDeprts();
            break;

          case "Add a Department":
            addDepartment();
            break;

          case "View Roles":
            viewRoles();
            break;

          case "Add a Role":
            addRole();
            break;

          case "View all Employees":
            viewEmployees();
            break;

          case "View Employees by Manager":
            viewEmployeesByManager();
            break;

          case "View Employees by Role":
            viewEmployeesByRole();
            break;

          case "Add a Employee":
            addEmployee();
            break;

          case "Done":
            endConnection();
            break;
        }
      })
  );
};

// end
const endConnection = () => {
  return inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirmDone",
        message: "Do you want to continue editing the database?",
        default: false,
      },
    ])
    .then((doneEdit) => {
      if (doneEdit.confirmDone) {
        return promptDbOptions();
      } else {
        return con.end();
      }
    });
};

// VIEW departments
const viewDeprts = () => {
  const query = `SELECT * FROM departments;`;
  con.query(query, (err, res) => {
    if (err) throw err;
    // Show the roles
    displyResult(`Departments`, res);
    endConnection();
  });
};

// ADD A DEPARTMENT
const addDepartment = () => {
  return inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "Enter new Department title:",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter title!");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const query = `INSERT INTO departments (dept_name) VALUES (?);`;
      con.query(query, [answer.deptName], (err, res) => {
        if (err) throw err;
        viewDeprts();
      });
    });
};

// VIEW roles
const viewRoles = () => {
  const query = `SELECT * FROM roles;`;
  con.query(query, (err, res) => {
    if (err) throw err;
    // Show the roles
    displyResult(`Roles`, res);
    endConnection();
  });
};

// ADD A ROLE
const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role's title? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter title!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What is the role's salary?(Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter salary!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "deptName",
        message: "What depatment does the role belong?(Required)",
        choices: [
          "Billing",
          "Competitive",
          "Facilities",
          "Human Resources",
          "Marketing",
          "Pre-school",
          "Recreational",
        ],
      },
    ])
    .then((answer) => {
      con.query(
        "SELECT id FROM departments where ? ",
        {
          dept_name: answer.deptName,
        },

        (err, res) => {
          if (err) {
            throw err;
          } else {
            for (let i = 0; i < res.length; i++) {
              deptID.push(res[i].id);
            }
            console.log(deptID);
            con.query(
              "INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)",
              [answer.title, answer.salary, deptID],
              (err, res) => {
                if (err) throw err;
                viewRoles();
              }
            );
          }
        }
      );
    });
};

// VIEW employees
const viewEmployees = () => {
  const query = `
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS department_name, concat(manager.first_name, " ", manager.last_name) AS manager_full_name
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON departments.id = roles.dept_id
    LEFT JOIN employees as manager ON employees.manager_id = manager.id`;
  con.query(query, (err, res) => {
    if (err) throw err;
    // show the employees
    console.table(res);
    displyResult("Employees", res);
    endConnection();
  });
};

const viewEmployeesByManager = () => {
  //query for managers
  const query = `
    SELECT DISTINCT concat(manager.first_name, " ", manager.last_name) AS full_name
    FROM employees
    LEFT JOIN employees AS manager ON manager.id = employees.manager_id
    WHERE manager.id IS NOT NULL;`;
  con.query(query, (err, res) => {
    if (err) throw err;
    //create manager array
    const managers = [];
    for (let i = 0; i < res.length; i++) {
      managers.push(res[i].full_name);
    }
    //prompt for manager selection
    return inquirer
    .prompt([
      {
        type: "list",
        name: "managerChoice",
        message: "Select a Manager:",
        choices: managers,
      }
    ])
    .then((answer) => {
      const query = `
  SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name, concat(manager.first_name, " ", manager.last_name) AS manager_name 
  FROM employees 
  INNER JOIN roles ON employees.role_id = roles.id
  INNER JOIN employees AS manager ON employees.manager_id = manager.id
  INNER JOIN departments ON departments.id = roles.dept_id
  WHERE manager.id IS NOT NULL AND concat(manager.first_name, " ", manager.last_name) = "${answer.managerChoice}";`;
  con.query(query, (err, res) => {
      if (err) throw err;
      console.table(answer.managerChoice);
      // show the employees
      console.table(res);
      displyResult("Employees by Manager", res);
      endConnection();
    }); 
    });
  });
  };

const viewEmployeesByRole = () => {
  const query = `SELECT * from roles`;
  con.query(query, (err, res) => {
    if (err) throw err;
    //create role array
    const roles = [];
    for (let i = 0; i < res.length; i++) {
      roles.push(res[i].title);
    }
return inquirer
    .prompt([
      {
        type: "list",
        name: "roleChoice",
        message: "Select a Role:",
        choices: roles,
      }
    ])
    .then((answer) => {
      const query = `
  SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name, concat(manager.first_name, " ", manager.last_name) AS manager_name 
  FROM roles 
  RIGHT JOIN employees ON employees.role_id = roles.id
  RIGHT JOIN employees AS manager ON employees.manager_id = manager.id
  RIGHT JOIN departments ON departments.id = roles.dept_id
  WHERE roles.title = "${answer.roleChoice}";`;
  con.query(query, (err, res) => {
    if (err) throw err;
    console.table(answer.roleChoice);
    // show the employees by role
    console.table(res);
    displyResult("Employees by Role", res);
    endConnection();
  }); 
  });
});
};

displyResult = (heading, data) => {
  console.clear();
  console.table(heading, data);
};

promptDbOptions();
