const homeMenu = [
    {
        name: 'home',
        type: 'list',
        message: 'Please select one of the following options',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Exit']
    }
];

const newDept = [
    {
        name: 'addDept',
        type: 'input',
        message: 'What would you like the name of this new department to be?'
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
        message: 'What existing department (by department_id) contains this role?',
        choices: ['1', '2', '3', '4', '5', '6','7', '8', '9', '10']
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
        message: 'What role (by role_id) will this employee fulfill?',
        choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    {
        name: 'newEmpMan',
        type: 'list',
        message: 'Which manager (by manager_id) will be this employees direct-report?',
        choices: ['1', '2', '3', '4', '5', '6','7', '8', '9', '10']
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