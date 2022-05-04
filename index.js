// get the client
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const { init } = require('express/lib/application');
const { response } = require("express");
const Connection = require("mysql2/typings/mysql/lib/Connection");
const table = require('console.table');

// create the connection to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "squirtleisaturtle",
    database: "employeetrack_db",
  },
  console.log("Employee Tracker Database")
);

//Question Prompt

const menu = {
  type: "list",
  message: "What Would You Like to Do Today?",
  name: "menu",
  choices: [
    "view all departments",
    "view all roles",
    "view all employees",
    "add a department",
    "add a role",
    "add an employee",
    "update an employee role",
    "quit"
  ],
};

const init = () => {
  inquirer.prompt(menu).then((response) => {
    switch (response.menu) {
      case "view all departments":
        departments();
        break;
      case "view all roles":
        roles();
        break;
      case "view all employees":
        employees();
        break;
      case "add a department":
        addDepartment();
        break;
      case "add a role":
        addRoles();
        break;
      case "add an employee":
        addEmployee();
        break;
      case "update an employee role":
        updateRoles();
        break;
      case "quit":
        process.exit();
    }
  });
};

