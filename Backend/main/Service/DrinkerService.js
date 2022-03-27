const DrinkerMapper = require("../Mapper/DrinkerMapper");
const FrequencyMapper = require("../Mapper/FrequencyMapper")
const _ = require("underscore")
const app = require("../app")

let validUsers = new Set();

function validate(userId){
    return validUsers.has(userId);
}

exports.validate = validate;

exports.drinkerSignUp = function(payload, results){
    let res = payload[0]
    let username = payload[1];
    let password = payload[2];
    results = JSON.parse(JSON.stringify(results)) // just parsing
    if(results.length){ // means this username already exists
        res.status(400).end();
        return;
    }res.status(200).end();
    DrinkerMapper.InsertIntoDrinker(null, [username, password], null);
}

exports.drinkerLogin = function (payload, results){
    let req = payload[0];
    let res = payload[1];
    //let username = payload[2];
    let password = payload[3];
    results = JSON.parse(JSON.stringify(results)) // just parsing
    if(!results.length){
        res.status(400).end();
    }else if(results[0].password === password) {
        let userId = results[0].id
        req.session.userId = userId;
        validUsers.add(userId)
        //console.log(req.session)
        res.status(200).end();
    }else{
        res.status(400).end();
    }
}

exports.drinkerGetNearBySeller = function (payload, results){
    let res = payload[0];
    let userId = payload[1];
    if(validate(userId)){
        results = JSON.parse(JSON.stringify(results)) // just parsing
        res.send(results).end()
    }else{
        res.status(400).end();
    }
}

exports.drinkerGetMenu = function (payload, results){
    let res = payload[0];
    let userId = payload[1]
    if(validate(userId)){
        results = JSON.parse(JSON.stringify(results)) // just parsing

        if(!results.length){
            res.status(400).end();
            return
        }
        //console.log("here")
        let seller_id = results[0].seller_id
        let seller_socket = app.getSellerSocket(seller_id)
        //console.log(seller_socket)
        if(seller_socket){
            res.send([seller_socket, results])
            return
        }
    }
    res.status(400).end();

}

exports.drinkerCheckCaffeine = function (socket, orders){
    let caffeine = 0;
    _.each(orders.orders, function(item){
        caffeine += item.caffeine
    })
    DrinkerMapper.SelectCaffeineById([socket, caffeine], orders.drinker_id, drinkerWarnCaffeine)
    DrinkerMapper.UpdateCaffeineById(null, orders.drinker_id, caffeine, null)
}

function drinkerWarnCaffeine(payload, results){
    let socket = payload[0]
    let caffeine = payload[1]
    results = JSON.parse(JSON.stringify(results)) // just parsing
    caffeine += results[0].caffeine
    socket.emit("caffeine", caffeine)
}

exports.drinkerGetHistoryOrder = function (payload, results){
    let res = payload
    results = JSON.parse(JSON.stringify(results)) // just parsing
    if(!results.length){
        res.status(400).end()
    }else{
        _.each(results, function (item){
            item.items = JSON.parse(item.items)
        })
        res.send(results)
    }
}

exports.drinkerGetRecommendation1 = function (socket_id, drinker_id){
    FrequencyMapper.SelectFrequencyMaxTotalByDrinkerId(socket_id, drinker_id, drinkerGetRecommendation2)
}

function drinkerGetRecommendation2 (socket, results){
    results = JSON.parse(JSON.stringify(results)) // just parsing
    if(!results.length){
        socket.emit("success", "no record")
    }else{
        socket.emit("success", JSON.parse(results[0].item))
    }
}