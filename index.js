// get the client
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const { init } = require('express/lib/application');
const { response } = require("express");

// create the connection to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "squirtleisaturtle",
    database: "employeeTrack.db",
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
    "quit",
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

// Inquirer add departmetn

const addDepartment = () => {
  console.log("-----ADD DEPARTMENT-----");

  return inquirer.prompt([
    {
      type: "input",
      name: "dept",
      message: "Department Name? (Required)",
      validate: (departmentName) => {
        if (departmentName) {
          return true;
        } else {
          console.log("Please enter a department!");
          return false;
        }
      }, 
    },
  ]) .then(answers => {
      console.log(answers);
  })
};
const addRoles = () => {
  console.log("-----ADD ROLES-----");

  return inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "Role Title? (Required)",
      validate: (roleName) => {
        if (roleName) {
          return true;
        } else {
          console.log("Please enter a role name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the salary for this role?",
      validate: (roleSalary) => {
        if (roleSalary) {
          return true;
        } else {
          console.log("Please enter a salary!");
          return false;
        }
      },
    },
    {
      type: "list",
      name: "roleDept",
      message: "What department does this role belong to?",
      choices: () => {
        const choices = [];
        for (let i = 0; i < response.length; i++) {
          choices.push(response[i].dept);
        }
      },
    },
  ]);
};
const addEmployee = () => {
  console.log("-----ADD EMPLOYEE-----");

  return inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Employee first name? (Required)",
      validate: (firstName) => {
        if (firstName) {
          return true;
        } else {
          console.log("Please enter a first name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee last name? (Required)",
      validate: (lastName) => {
        if (lastName) {
          return true;
        } else {
          console.log("Please enter a last name!");
          return false;
        }
      },
    },
    // {
    //     type: 'list',
    //     name: 'employeeRole',
    //     message: 'Employee Role? (Required)',
    //     validate: departmentName => {
    //         if (departmentName) {
    //             return true;
    //         } else {
    //             console.log('Please enter a first name!');
    //             return false;
    //         }
    //     }
    // },
    // {
    //     type: 'input',
    //     name: 'firstName',
    //     message: 'Employee first name? (Required)',
    //     validate: departmentName => {
    //         if (departmentName) {
    //             return true;
    //         } else {
    //             console.log('Please enter a first name!');
    //             return false;
    //         }
    //     }
    // }
  ]);
};

init();
