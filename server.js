const connection = require("./db/connection");
const inquirer = require("inquirer");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected Successfully!");

  startTracker();
});

function init() {
  console.log(`

 __________________________________________________________________________
|                                                                          |
|    _____           _                     _____                           | 
|   |   __|_____ ___| |___ _ _ ___ ___    |     |___ ___ ___ ___ ___ ___   |
|   |   __|     | . | | . | | | -_| -_|   | | | | .'|   | .'| . | -_|  _|  |
|   |_____|_|_|_|  _|_|___|_  |___|___|   |_|_|_|__,|_|_|__,|_  |___|_|    |
|               |_|       |___|                             |___|          |
|                                                                          |
|__________________________________________________________________________|                
                
                
                `);
}

function startTracker() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "Select from the following:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.option) {
        case "View all departments":
          viewDepartment();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;

        default:
          console.log("select an option");
          break;
      }
    });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
    startTracker();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", (err, results) => {
    if (err) throw err;
    console.table(results);
    startTracker();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employees", (err, results) => {
    if (err) throw err;
    console.table(results);
    startTracker();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter department name:",
      },
    ])
    .then((answer) => {
      connection.query("INSERT INTO department SET ?", answer, (err, res) => {
        if (err) throw err;
        console.log("Added Successfully!");
        startTracker();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter salary:",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter department id:",
      },
    ])
    .then((answer) => {
      connection.query("INSERT INTO roles SET ?", answer, (err, res) => {
        if (err) throw err;
        console.log("Added Successfully!");
        startTracker();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Employee first name:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Employee last name:",
      },
      {
        type: "input",
        name: "roles_id",
        message: "Employee role id:",
      },
    ])
    .then((answer) => {
      connection.query("INSERT INTO employees SET ?", answer, (err, res) => {
        if (err) throw err;
        console.log("Added Successfully!");
        startTracker();
      });
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "Enter Employee id:",
      },
      {
        type: "input",
        name: "roles_id",
        message: "Enter role id:",
      },
    ])
    .then((answer) => {
      connection.query(
        "UPDATE employees SET roles_id = ? WHERE id =?",
        [answer.roles_id, answer.employee_id], (err, res) => {
          if (err) throw err;
          console.log("Updated Successfully!");
          startTracker();
        }
      );
    });
}

init();
