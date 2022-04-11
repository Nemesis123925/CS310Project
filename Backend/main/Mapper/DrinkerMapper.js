let config = require("../mysql_setup/mysql_setup")
let connection = config.connection

exports.InsertIntoDrinker = function(payload, drinker, callback){
    connection.query("INSERT INTO Drinkers (username, password, caffeine) VALUES (?, ?, 0)",
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

exports.SelectDrinkerByUsername = function(payload, username, callback){
    connection.query("SELECT * FROM Drinkers WHERE username = ?",
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

exports.SelectCaffeineById = function (payload, drinkerId, callback){
    connection.query("SELECT caffeine FROM Drinkers WHERE id = ?",
        drinkerId, // notice here, class_code is an array of professor_name, class_date, class_Codes
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

exports.UpdateCaffeineById = function (payload, drinkerId, caffeine, callback){
    connection.query("UPDATE Drinkers SET caffeine = caffeine + ? WHERE id = ?",
        [caffeine, drinkerId],
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