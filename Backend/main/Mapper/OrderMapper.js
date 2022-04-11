let config = require("../mysql_setup/mysql_setup")
let connection = config.connection

exports.InsertIntoOrders = function(payload, order, callback){
    connection.query("INSERT INTO Orders (drinker_id, seller_id, time_order, items) VALUES (?, ?, ?, ?)",
        order,
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

exports.SelectOrdersBySellerId = function(payload, seller_id, callback){
    connection.query("SELECT * FROM Orders WHERE seller_id = ?",
        seller_id,
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

exports.SelectOrdersByDrinkerId = function(payload, drinker_id, callback){
    connection.query("SELECT * FROM Orders WHERE drinker_id = ?",
        drinker_id,
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

exports.UpdateFinishTimeByOrderId = function (payload, time, callback){
    connection.query("UPDATE Orders SET time_finish = ? WHERE id = ?",
        time,
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