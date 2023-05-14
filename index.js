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

    start()
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
                database.query('SELECT id, CONCAT (first_name," ", last_name) AS employee FROM employee', (err, result) => {
                    console.log(result);
                    inquirer.prompt([{
                        name: "selectEmployee",
                        type: 'list',
                        choices: result.map(obj => obj.employee) // obj = {id:1, employee:"J C"}
                    }]).then(answer => {
            
                        const selectedEmployeeName = answer.selectEmployee;
                        let selectedEmployeeId = result.filter(obj => obj.employee == selectedEmployeeName);
            
                        selectedEmployeeId = selectedEmployeeId.length ? selectedEmployeeId[0].id : -1;
                        /**
                         * if(selectedEmployeeId.length>0) {
                         *  selectedEmployeeId = selectedEmployeeId[0].id; // {id:1, employee:"J C"}
                         * } else {
                         *  selectedEmployeeId = -1;
                         * }
                         */
            
                        if (selectedEmployeeId == -1) {
                            console.log("Error - The selected name doesn't match the database");
                        } else {
                            console.log("The user selected employee ID:")
                            console.log(selectedEmployeeId);
            
                            // TODO: Show role titles and convert back to role_id so you can update the employee's role_id
            
            
                            // UPDATE employee SET role_id=? WHERE id=?, [selectedRoleId, selectedEmployeeId]
                        }
            
            
                        // ..
                        process.exit();
                    })
                })
            }
        });       
};   

            
                //process.exit();
            
                // (answers.addDept.input)
            ///////////////////////////////////////////////
            
            // function viewDept() {
            //     const sqlString = `
            //     SELECT * 
            //     FROM department`
            
            //     connection.query(sqlString, (err, data) => {
            //         if(err) throw err;
            //         console.log("\n")
            //         console.table(data)
            //         console.log("\n")
            
            //         start();
            //     });
            // };
            
            // function viewRole() {
            //     const sqlString = `
            //     SELECT *
            //     FROM role`
            
            //     connection.query(sqlString, (err, data) => {
            //         if(err) throw err;
            //         console.log("\n")
            //         console.table(data)
            //         console.log("\n")
            
            //         start();
            //     });
            // };
            
            // function viewEmployees() {
            //     const sqlString = `
            //     SELECT *
            //     FROM employee`
            
            //     connection.query(sqlString, (err, data) => {
            //         if(err) throw err;
            //         console.log("\n")
            //         console.table(data)
            //         console.log("\n")
            
            //         start();
            //     });
            // };
            
            // function addDept() {
            //     const sqlString = `
            //     CREATE TABLE ""`
            
            //     connection.query(sqlString, (err, data) => {
            //         if(err) throw err;
            //         console.log("\n")
            //         console.table(data)
            //         console.log("\n")
            
            //         start();
            //     });
            // };
            
            // function viewEmployees() {
            //     const sqlString = `
            //     SELECT *
            //     FROM employee`
            
            //     connection.query(sqlString, (err, data) => {
            //         if(err) throw err;
            //         console.log("\n")
            //         console.table(data)
            //         console.log("\n")
            
            //         start();
            //     });
            // };
            // // [
            // //     {
            // //         message: "What would you like to do?",
            // //         type: "list",
            // //         name: "option",
            // //         choices: ["View all departments", "Done"]
            // //     }
            // // ]