// ./server/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "group6-mysql.cpkugakeoznv.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "SWEGroup6database12",
  database: "user_database",
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL on AWS RDS');
});

module.exports = connection;
