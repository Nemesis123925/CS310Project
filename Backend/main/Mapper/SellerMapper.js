let config = require("../mysql_setup/mysql_setup")
let connection = config.connection

exports.InsertIntoSeller = function(payload, drinker, callback){
    connection.query("INSERT INTO SELLERS (username, password) VALUES (?, ?)",
        drinker, // notice here, class_code is an array of professor_name, class_date, class_Codes
        function (error, results) {
            //console.log(results);
            if (error) {
                console.log(error);
                throw error;
            }
            if(callback !== null){
                callback(payload, results)
            }
        })
}

exports.SelectSellerByUsername = function(payload, username, callback){
    connection.query("SELECT * FROM SELLERS WHERE username = ?",
        username, // notice here, class_code is an array of professor_name, class_date, class_Codes
        function (error, results) {
            //console.log(results);
            if (error) {
                console.log(error);
                throw error;
            }
            if(callback !== null){
                callback(payload, results)
            }
        })
}