// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { init } = require('express/lib/application');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'squirtleisaturtle',
    database: 'employeeTrack.db'
  },
  console.log('Employee Tracker Database')
  );

//Question Prompt

const menu = {
    type: 'list',
    message: 'What Would You Like to Do Today?',
    name: 'menu',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']

}



init();