const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'mancity_DB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connection ID: ${connection.threadId}\n`);
});

connection.query = util.promisify(connection.query);

module.exports = connection