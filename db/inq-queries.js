const homeMenu = [
    {
        name: 'home',
        type: 'list',
        message: 'Please select one of the following options',
        choices: ['View all departments', 'View all roles', 'View all emplpoyees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role']
    }
];

const newDept = [
    {
        name: 'addDept',
        type: 'input',
        message: 'What will the name of this new department be?'
    }
];

const newRole = [
    {
        name: 'addRoleTitle',
        type: 'input',
        message: 'What is the job title for the role you would like to create?'
    },
    {
        name: 'addRoleSalary',
        type: 'input',
        message: 'What is the salary for this role?'
    },
    {
        name: 'addRoleDept',
        type: 'input',
        message: 'What department does this role exist within?'
    }

];

const newEmp = [
    {
        name: 'newEmpFirst',
        type: 'input',
        message: 'What is the first name of the employee you would like to add?',
    },
    {
        name: 'newEmpLast',
        type: 'input',
        message: 'What is the last name of the employee you would like to add?',
    },
    {
        name: 'newEmpRole',
        type: 'list',
        message: 'What role will this employee fulfill?',
        choices: ['']
    },
    {
        name: 'newEmpMan',
        type: 'list',
        message: 'Which manager will be this employees direct-report?',
        choices: ['']
    },
];

const updateRole = [
    {
        name: 'updateEmp',
        type: 'list',
        message: "Which employee's role would you like to update?",
        choices: ['']
    },
    {
        name: 'updateEmpRole',
        type: 'list',
        message: 'Which updated role would you like to assign to this employee?',
        choices: ['']
    }
];


module.exports = {homeMenu, newDept, newRole, newEmp, updateRole}

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 