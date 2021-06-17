const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    viewEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, job.title, department.name AS department, job.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN job on employee.job_id = job.id LEFT JOIN department on job.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }

    viewDepartments() {
        return this.connection.query(
            'SELECT department.id, department.name FROM department LEFT JOIN job on job.department_id = department.id LEFT JOIN employee on employee.job_id = job.id GROUP BY department.id, department.name;'
        )
    };

    viewJobs() {
        return this.connection.query(
            'SELECT job.id, job.title, department.name AS department, job.salary from job LEFT JOIN department on job.department_id = department.id;'
        )
    };

    addEmployee(employee) {
        return this.connection.query('INSERT INTO employee SET ?;', employee)
    };

    addJob(job) {
        return this.connection.query('INSERT INTO job SET ?;', job)
    };

    addDepartment(department) {
        return this.connection.query('INSERT INTO department SET ?;', department)
    };

    updateEmployee(employeeId, jobId) {
        return this.connection.query('UPDATE employee SET job_id = ? WHERE id = ?;', [jobId, employeeId])
    }

}

module.exports = new DB(connection);