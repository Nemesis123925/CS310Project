let config = require("../mysql_setup/mysql_setup")
let connection = config.connection

exports.InsertIntoItem = function(payload, item, callback){
    connection.query("INSERT INTO Items (seller_id, name, price, caffeine) VALUES (?, ?, ?, ?)",
        item,// notice here, class_code is an array of professor_name, class_date, class_Codes
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

exports.SelectItemsBySellerId = function(payload, seller_id, callback){
    connection.query("SELECT * FROM Items where seller_id = ?",
        seller_id,// notice here, class_code is an array of professor_name, class_date, class_Codes
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