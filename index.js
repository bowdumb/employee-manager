const inquirer = require("inquirer");
const mysql = require("mysql2");
const { homeMenu, newDept, newRole, newEmp, updateRole} = require("./db/inq-queries");
require('dotenv').config();

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
    )};
            // }else if (answers.home == "Update employee role") {
            //     database.query('SELECT id, CONCAT (first_name," ", last_name) AS employee FROM employee', (err, result) => {
            //         console.log(result);
            //         inquirer.prompt([{
            //             name: "selectEmployee",
            //             type: 'list',
            //             choices: result.map(obj => obj.employee) // obj = {id:1, employee:"J C"}
            //         }]).then(answer => {
            
            //             const selectedEmployeeName = answer.selectEmployee;
            //             let selectedEmployeeId = result.filter(obj => obj.employee == selectedEmployeeName);
            
            //             selectedEmployeeId = selectedEmployeeId.length ? selectedEmployeeId[0].id : -1;

                    
            //             /**
            //              * if(selectedEmployeeId.length>0) {
            //              *  selectedEmployeeId = selectedEmployeeId[0].id; // {id:1, employee:"J C"}
            //              * } else {
            //              *  selectedEmployeeId = -1;
            //              * }
            //              */
            
            //             if (selectedEmployeeId == -1) {
            //                 console.log("Error - The selected name doesn't match the database");
            //             } else {
            //                 console.log("The user selected employee ID:")
            //                 console.log(selectedEmployeeId);
            
            //                 // TODO: Show role titles and convert back to role_id so you can update the employee's role_id
            //                 database.query(`SELECT id, title FROM role`, (err, roleResult) => {
            //                     if (err) {
            //                         console.log(err);
            //                     }
            //                     inquirer.prompt([{
            //                         name: 'selectRole',
            //                         typpe: 'list',
            //                         message: 'Which role would you like to assign to this employee?',
            //                         choices: roleResult.map(obj=>obj.role)
            //                     }]).then(answer => {
            //                         const selectedRoleTitle = answer.selectRole;
            //                         let selectedRoleId = roleResult.filter(obj=>obj.role == selectedRoleTitle);

            //                         selectedRoleId = selectedRoleId.length ? selectedEmployeeId[0].id: -1;
            //                     })

            //                 })
            //                 // const selectedRoletitle = answer.selectRoleId;
            //                 // let 
            
            //                 // UPDATE employee SET role_id=? WHERE id=?, [selectedRoleId, selectedEmployeeId]
            //             })
            
            
                        // ..
        //                 process.exit();
        //             })
        //         }
        //     })
        // };       
   

      