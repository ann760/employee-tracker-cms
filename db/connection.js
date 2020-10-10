const mysql = require("mysql2");

// create the connection to database
const con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your MySQL username
  user: "root",
  // Your MySQL password
  password: "loloBugga!0",
  database: "employees",
});

con.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptDbOptions();
  });

  module.exports = con;
