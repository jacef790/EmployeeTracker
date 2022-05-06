const inquirer = require("inquirer");
const consoleTable = require("console.table");

// get the client
const mysql = require("mysql2");
const { response } = require("express");
const { restoreDefaultPrompts } = require("inquirer");
const res = require("express/lib/response");
// const Connection = require("mysql2/typings/mysql/lib/Connection");

// create the connection to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "squirtleisaturtle",
    database: "employeetrack_db",
  },
  console.log("Database Connected")
);

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

//opening card

const init = () => {
  console.log("#######################");
  console.log("#                     #");
  console.log("#  EMPLOYEE MANAGER   #");
  console.log("#                     #");
  console.log("#######################");
  startMenu();
};

// Initial inquirer menu

const startMenu = () => {
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

//add department prompt

const departmentPrompt = {
  type: "input",
  message: "Name of new department?",
  name: "newDepartment",
};

//add role prompt

const rolePrompt = [
  {
    type: "input",
    message: "Name of new role?",
    name: "newRole",
  },
  {
    type: "number",
    message: "Salary of new role?",
    name: "newSalary",
  },
  {
    type: "list",
    message: "What department ID does this role belong to?",
    name: "newDepartment_id",
  },
];

//add employee prompt

//View departments in table

const departments = () => {
  const sql = "SELECT * FROM department";

  db.promise()
    .query(sql)
    .then(([rows, fields]) => {
      const table = consoleTable.getTable(rows);
      console.log(table);
      startMenu();
    });
};

// view roles in table

const roles = async () => {
  try {
    const sql = "SELECT * FROM role";

    const [rows, fields] = await db.promise().query(sql);

    const table = consoleTable.getTable(rows);
    console.log(table);
    startMenu();
  } catch (err) {
    console.log(err);
  }
};

// view employees in table

const employees = () => {
  const sql = "SELECT * FROM employee";

  db.promise()
    .query(sql)
    .then(([rows, fields]) => {
      const table = consoleTable.getTable(rows);
      console.log(table);
      startMenu();
    });
};

// add to department table

const addDepartment = () => {
  inquirer.prompt(departmentPrompt).then((response) => {
    newDept(response);
  });
  const newDept = (data) => {
    const { newDepartment } = data;
    const addDept = [newDepartment];
    const sql = "INSERT INTO department (name) VALUES (?)";
    db.promise()
      .query(sql, addDept)
      .then(console.log(`${newDepartment} added to database`));
    startMenu();
  };
};

//add to role table

const addRoles = async () => {
  const [departments] = await db
    .promise()
    .query("SELECT id AS value, name AS name FROM department");
  console.log(departments);
  const rolePrompt = [
    {
      type: "input",
      message: "Name of new role?",
      name: "newRole",
    },
    {
      type: "number",
      message: "Salary of new role?",
      name: "newSalary",
    },
    {
      type: "list",
      message: "What department ID does this role belong to?",
      name: "newDepartment_id",
      choices: departments,
    },
  ];

  const data = await inquirer.prompt(rolePrompt);
  const sql = `INSERT INTO role SET ?`;
  const [rows, fields] = await db
    .promise()
    .query(sql, {
      title: data.newRole,
      salary: data.newSalary,
      department_id: data.newDepartment_id,
    });
  console.log(
    `${data.newRole}, ${data.newSalary}, ${data.newDepartment_id} added to database`
  );
  startMenu();
};

// add employee

const addEmployee = async () => {
  const [roles] = await db
    .promise()
    .query("SELECT id AS value, title AS name FROM role");
  const [employees] = await db
    .promise()
    .query("SELECT id AS value, last_name AS name FROM employee");

  const newEmployeePrompt = [
    {
      type: "input",
      message: "First Name",
      name: "first_name",
    },
    {
      type: 'input',
      message: 'Last Name',
      name: 'last_name'
    },
    {
      type: 'list',
      message: 'What Role Will Employee belong in',
      name: 'role_id',
      choices: roles
    },
    {
      type: 'list',
      message: 'Who is employees manager',
      name: 'manager_id',
      choices: employees
    }
  ];
  const newempprompt = await inquirer.prompt(newEmployeePrompt);
  const [addDb] = await db.promise().query('INSERT INTO employee SET ?', newempprompt)
  console.log(`employee added`)
  startMenu();
};

init();
