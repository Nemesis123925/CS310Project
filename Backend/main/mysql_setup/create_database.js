// this js is created to do the deployment of mysql database
// ideally, by only running this .js will create the database and all the tables

// first create the database called ResolveDatabase
let mysql = require('mysql');
// in this part, please replace user and password to what's available
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("DROP DATABASE IF EXISTS `310Project`;", function (err) {
        if (err) throw err;
        connection.query("CREATE DATABASE 310Project", function (err) {
            if (err) throw err;
            console.log("Database created");
            connection.query("USE 310Project", function (err) {
                if (err) throw err;
                console.log("Using 310Project");
            });
            connection.end();
        });
    });
}); // this query create database called ResolveDatabase

