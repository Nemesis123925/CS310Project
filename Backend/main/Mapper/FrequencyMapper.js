let config = require("../mysql_setup/mysql_setup")
let connection = config.connection

exports.InsertIntoFrequency = function(payload, item, callback){
    connection.query("INSERT INTO frequency (drinker_id, item, total) VALUES (?, ?, ?)",
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

exports.SelectFrequency = function(payload, item, callback){
    connection.query("SELECT id FROM frequency WHERE drinker_id = ? AND item = ?",
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

exports.UpdateFrequency = function(payload, id, callback){
    connection.query("UPDATE frequency SET total = total + 1 WHERE id = ?",
        id,// notice here, class_code is an array of professor_name, class_date, class_Codes
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

exports.SelectFrequencyMaxTotalByDrinkerId = function(payload, drinker_id, callback){
    connection.query("SELECT item, MAX(total) FROM frequency WHERE drinker_id = ? GROUP BY item",
        drinker_id,// notice here, class_code is an array of professor_name, class_date, class_Codes
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


