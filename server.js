const { prompt } = require ('inquirer');
const mysql = require ('mysql');
const db = require('./db')
require('console.table');

const start = async () => {
    const { task } = await prompt({
        name: 'task',
        type: 'list',
        message: "What would you like to do?",
        choices: [
        "View All Employees", 
        "View All Jobs", 
        "View All Departments", 
        "Add Employee",
        "Add Job", 
        "Add Department", 
        "Update Employee Role", 
        "Exit"],
    });
    switch (task) {
        case "View All Employees":
            viewEmployees();
            break;
        case "View All Jobs":
            viewJobs();
            break;
        case "View All Departments":
            viewDepartments();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Add Job":
            addJob();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Update Employee Role":
            updateEmployee();
            break;
        case "Exit":
            return quit();
    };
};

const viewEmployees = async () => {
    const employees = await db.viewEmployees();
    console.log('\n');
    console.table(employees);
    start();
};

const viewJobs = async () => {
    const jobs = await db.viewJobs();
    console.log('\n')
    console.table(jobs);
    start();
};

const viewDepartments = async () => {
    const departments = await db.viewDepartments();
    console.log('\n');
    console.table(departments);
    start();
};

const addEmployee = async () => {
    const jobs = await db.viewJobs();
    const employees = await db.viewEmployees();

    const employee = await prompt([
        {
            name: 'first_name',
            message: "What is the new employee's first name?",
        },
        {
            name: 'last_name',
            message: "What is the new employee's last name?",
        },
    ]);

    const jobChoices = jobs.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const { jobId } = await prompt({
        type: "list",
        name: "jobId",
        message: "What is the new employee's job?",
        choices: jobChoices,
    });

    employee.job_id = jobId;

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    managerChoices.unshift({ name: 'None', value: null })

    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Who is the new employee's manager?",
        choices: managerChoices,
    });

    employee.manager_id = managerId;

    await db.addEmployee(employee);
    console.log(`added ${employee.first_name} ${employee.last_name} as new employee`);

    start();
};

const addJob = async () => {
    const dept = await db.viewDepartments();

    const job = await prompt([
        {
            name: 'title',
            message: "What is the title of the new job?",
        },
        {
            name: 'salary',
            message: "How much does the new job make?",
            validate: answer => {
                const pass = answer.match(/^[1-9]\d*$/);
                if (pass) {
                    return true
                }
                return "please enter a number greater than 0"
            },
        }
    ]);

    const deptChoices = dept.map(({ id, name }) => ({
        name: name,
        value: id,
    }));

    deptChoices.unshift({ name: 'None', value: null })

    const { deptId } = await prompt({
        type: "list",
        name: "deptId",
        message: "What department does the new job belong to?",
        choices: deptChoices,
    });

    job.department_id = deptId;

    await db.addJob(job);
    console.log(`added ${job.title} as a new job`);

    start();
}

const addDepartment = async () => {
    const department = await prompt({
        name: 'name',
        message: "What is the name of the new department?",
    });

    await db.addDepartment(department);
    console.log(`added ${department.name} as new department`);

    start();
}

const updateEmployee = async () => {
    const employees = await db.viewEmployees();
    const jobs = await db.viewJobs();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name},${last_name}`,
        value: id,
    }));
    
    const { employeeId } = await prompt({
        type: 'list',
        name: 'employeeId',
        message: 'What employee do you want to update?',
        choices: employeeChoices,
    });

    const jobChoices = jobs.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const { jobId } = await prompt({
        type: "list",
        name: "jobId",
        message: "What is the employee's new job?",
        choices: jobChoices,
    });

    await db.updateEmployee(employeeId, jobId);
    console.log('employee has been updated');
    start();
}

const quit = () => {
    console.log('Goodbye')
    process.exit();
}

start();