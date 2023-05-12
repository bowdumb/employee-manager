const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "10Stimpys!",
    database: "employee_db"
})

connection.connect(function(err) {
    if(err) throw err;

    start()
})

const start = () => {
    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            name: "option",
            choices: ["View all departments", "Done"]
        }
    ]).then((answers) => {
        if(answers.option == "View all departments") {
            viewDept()
        }
    })
}

function viewDept() {
    const sqlString = `
    SELECT * 
    FROM department`

    connection.query(sqlString, (err, data) => {
        if(err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        start()
    })
}