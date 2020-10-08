// import mysql
const mysql = require('mysql2');
// import express
const express = require("express");
const inputCheck = require("./utils/inputCheck");
// port
const PORT = process.env.PORT || 3001;
// app express
const app = express();
// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your MySQL username
    user: "root",
    // Your MySQL password
    password: "loloBugga!0",
    database: "employees",
  });