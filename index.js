// Enabling access to the necessary NPM packages as well as importing the exported array objects containing the Inquirer questions from inq-queries.js
const inquirer = require("inquirer");
const mysql = require("mysql2");
require('dotenv').config();
const { homeMenu, newDept, newRole, newEmp } = require("./inq-queries");

// Establishing connection between our database and MySQL while using the dotenv NPM package to obscure sensitive user information when publicly posting the
// repository to GitHub.
const database = mysql.createConnection({
    host: "127.0.0.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

database.connect(function (err) {
    if (err) throw err;

    start();
})

//This start() function contains all of our JavaScript logic. Using a series of database queries we are able to manipulate the database using user input from the
// Inquirer prompts that they will interact with through their terminal. After each feature is completed, the user is taken back to the home menu so that they can
// select what they would like to do next. If the user chooses to exit the program, the Node.js process is terminated.
const start = () => {
    inquirer.prompt(homeMenu)
        .then((answers) => {
            if (answers.home == "View all departments") {
                database.query(`SELECT * FROM department`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);

                    start();
                });
            } else if (answers.home == "View all roles") {
                database.query(`SELECT * FROM role`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);

                    start();
                });
            } else if (answers.home == "View all employees") {
                database.query(`SELECT * FROM employee`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result)

                    start();
                });
            } else if (answers.home == "Add a department") {
                inquirer.prompt(newDept)
                    .then((answer) => {
                        database.query(`INSERT INTO department (name) VALUES (?)`, [answer.addDept], (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(answer.newDept + 'Has been created!');

                            start();
                        });
                    });
            } else if (answers.home == "Add a role") {
                inquirer.prompt(newRole)
                    .then((answer) => {
                        database.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answer.addRoleTitle, answer.addRoleSalary, answer.addRoleDept], (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(answer.addRoleTitle + " has been created!");

                            start();
                        })
                    });

            } else if (answers.home == "Update employee role") {
                database.query('SELECT id, CONCAT(first_name, " ", last_name) AS employee FROM employee', (err, employeeResult) => {
                    if (err) {
                        console.log(err);
                    }

                    database.query('SELECT id, title FROM role', (err, roleResult) => {
                        if (err) {
                            console.log(err);

                        }

                        inquirer.prompt([
                            {
                                name: "selectEmployee",
                                type: "list",
                                message: "Select the employee to update:",
                                choices: employeeResult.map(obj => obj.employee)
                            },
                            {
                                name: "selectRole",
                                type: "list",
                                message: "Select the new role for the employee:",
                                choices: roleResult.map(obj => obj.title)
                            }
                        ]).then(answer => {
                            const selectedEmployeeName = answer.selectEmployee;
                            const selectedRoleTitle = answer.selectRole;
                            let selectedEmployeeId = employeeResult.find(obj => obj.employee === selectedEmployeeName).id;
                            let selectedRoleId = roleResult.find(obj => obj.title === selectedRoleTitle).id;

                            database.query('UPDATE employee SET role_id = ? WHERE id = ?', [selectedRoleId, selectedEmployeeId], (err, result) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(`Employee role updated successfully.`);
                                }
                            });
                            start();
                        });
                    });
                });
            } else if (answers.home == "Add an employee") {
                inquirer.prompt(newEmp)
                    .then((answer) => {
                        database.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answer.newEmpFirst, answer.newEmpLast, answer.newEmpRole, answer.newEmpMan], (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(answer.newEmpFirst + " " + answer.newEmpLast + " has been created and their role and manager have been assigned!");
                        });
                        start();
                    });
            } else if (answers.home == "Exit") {
                process.exit();
            }
        }
        )
};