const inquirer = require('inquirer');
const connection = require('./db/connection');

connection.connect((err) => {
    if (err) throw err;
    console.log('connected to database');
    startTracker();
})

function startTracker() {
    inquirer.prompt([ 
        {
            type: 'list',
            name: 'option',
            message: 'Select from the following:',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
                ]
        }
    ]).then(answer => {
        switch (answer.option) {
            case 'View all departments':
                viewDepartment();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break; 
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;

            default:
                console.log('select an option');
                break;
        }
    });
}

function viewDepartment() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw error;
        console.table(res);
        startTracker();
    });
}

function viewRoles() {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw error;
        console.table(res);
        startTracker();
    });
}

function viewEmployees() {
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw error;
        console.table(res);
        startTracker();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter department name:'
        }
    ]).then(answer => {
        connection.query('INSERT INTO department SET ?', answer, (err, res) => {
            if (err) throw error;
            console.log('Added Successfully!');
            startTracker();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter salary:'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter department id:'
        }
    ]).then(answer => {
        connection.query('INSERT INTO role SET ?', answer, (err, res) => {
            if (err) throw error;
            console.log('Added Successfully!');
            startTracker();
        });
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Employee first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Employee last name:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Employee role id:'
        }
    ]).then(answer => {
        connection.query('INSERT INTO employees SET ?', answer, (err, res) => {
            if (err) throw error;
            console.log('Added Successfully!');
            startTracker();
        });
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter Employee id:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter role id:'
        }
    ]).then(answer => {
        connection.query('UPDATE employees SET roleId = ? WHERE id =?', 
        [answer.roleId, answer.employeeId],
         (err, res) => {
            if (err) throw error;
            console.log('Updated Successfully!');
            startTracker();
        });
    });
}


