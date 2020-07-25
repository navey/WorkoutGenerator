const mysql = require('mysql');
const dbConfig = require('./config/db.config');

// create connection to MySQL database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    port: dbConfig.PORT
});

// open MySQL connection
connection.connect(error => {
    if (error) console.log(error);
    else console.log("Successfully connected to the database.");
});

module.exports = connection;