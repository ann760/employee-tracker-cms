const mysql = require("mysql2");
const index = require("../index")
//const Queries = require("./Queries")


// create the connection to database
const con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your MySQL username
  user: "root",
  // Your MySQL password
  password: "loloBugga!0",
  database: "employee_cms",
});

con.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + con.threadId + "\n");
    //index.promptDbOptions()
  });


  module.exports = con;
