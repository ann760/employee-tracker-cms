// import 
const mysql = require('mysql2');
const express = require("express");
const inquirer = require("inquirer");
const console = require("console.table");
//const con = require("./db/connection");
const Queries = require("./db/Queries");

// port
const PORT = process.env.PORT || 3001;
// app express
const app = express();
// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




// select a managament option on the db
const promptDbOptions = () => {
  let dbAction = {
      type: "list",
      name: "dbOption",
      message: "What would you like to do? (Required)",
      choices: ["View Departments",
      "Add a Department",
      "View Roles",
      "Add a Role",
      "View all Employees", 
      "View all Employees by Manager", 
      "View all Employees by Role",
      "Add an Employee"]
  };   
  return inquirer.prompt(dbAction).then((choice) => {
      switch (choice.promptChoice) {
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
  //.then( () => con.end());
};

promptDbOptions()



