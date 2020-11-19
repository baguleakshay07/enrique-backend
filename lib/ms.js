const mysql = require("mysql");
const config = require("config");

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'root',
    database: 'enquire'
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;