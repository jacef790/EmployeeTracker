const inquirer = require('inquirer');
const consoleTable = require('console.table');

// get the client
const mysql = require('mysql2');
const { response } = require('express');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'squirtleisaturtle',
  database: 'employeetrack_db'
},
  console.log('Database Connected')
  );

  const menu = {
    type:'list',
    message: 'What Would You Like to Do Today?',
    name: 'menu',
    choices: [
      'view all departments',
      'view all roles',
      'view all employees',
      'add a department',
      'add a role',
      'add an employee',
      'update an employee role',
      'quit'
    ]

  };

  //opening card

  const init = () => {
    console.log('#######################')
    console.log('#                     #')
    console.log('#  EMPLOYEE MANAGER   #')
    console.log('#                     #')
    console.log('#######################')
    startMenu();
  };

  // Initial inquirer menu

  const startMenu = () => {
    inquirer
    .prompt(menu).then((response) => {
      switch(response.menu) {
      case 'view all departments':
        departments();
        break;
      case 'view all roles':
        roles();
        break;
      case 'view all employees':
        employees();
        break;
      case 'add a department':
        addDepartment();
        break;
      case 'add a role':
        addRoles();
        break;
      case 'add an employee':
        addEmployee();
        break;
      case 'update an employee role':
        updateRoles();
        break;
      case 'quit':
        process.exit();
    }
  }
    )
  }

  //View departments in table
  
const departments = () => {
  const sql = 'SELECT * FROM department';

  db.promise().query(sql)
  .then(([rows, fields]) => {
      const table = consoleTable.getTable(rows);
      console.log(table);
  })
  
};

// view roles in table

const roles = () => {
  const sql = 'SELECT * FROM role';

  db.promise().query(sql)
  .then(([rows, fields]) => {
      const table = consoleTable.getTable(rows);
      console.log(table);
  })
  

// view employees in table

};
const employees = () => {
  const sql = 'SELECT * FROM employee';

  db.promise().query(sql)
  .then(([rows, fields]) => {
      const table = consoleTable.getTable(rows);
      console.log(table);
  })
  
};

// add to department table



init();
