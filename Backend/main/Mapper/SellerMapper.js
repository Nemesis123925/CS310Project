let config = require("../mysql_setup/mysql_setup")
let connection = config.connection

exports.InsertIntoSeller = function(payload, seller, callback){
    connection.query("INSERT INTO SELLERS (username, password, latitude, longitude) VALUES (?, ?, ?, ?)",
        seller,
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

exports.SelectNearBySeller = function(payload, latitude ,longitude, callback){
    let set = []
    let range = 100
    set[0] = latitude - range;
    set[1] = latitude + range;
    set[2] = longitude - range;
    set[3] = longitude + range;

    connection.query("SELECT * FROM SELLERS WHERE latitude BETWEEN ? AND ? AND longitude BETWEEN ? AND ?",
        set, // notice here, class_code is an array of professor_name, class_date, class_Codes
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