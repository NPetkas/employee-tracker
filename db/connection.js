const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'employee_db'
});
connection.connect((error) => {if (err) throw error})

module.exports = connection;