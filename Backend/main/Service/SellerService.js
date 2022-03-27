const SellerMapper = require("../Mapper/SellerMapper");
const ItemMapper = require("../Mapper/ItemMapper");


let _ = require("underscore")
let validUsers = new Set();

function validate(userId){
    return validUsers.has(userId);
}
exports.validate = validate;

exports.sellerSignup = function(payload, results){
    let res = payload[0]
    let username = payload[1];
    let password = payload[2];
    let location = payload[3];
    location = JSON.parse(location)
    results = JSON.parse(JSON.stringify(results)) // just parsing
    if(results.length){ // means this username already exists
        res.status(400).end();
        return;
    }res.status(200).end();
    SellerMapper.InsertIntoSeller(null, [username, password, location.latitude, location.longitude], null);
}

exports.sellerLogin = function (payload, results){
    let req = payload[0];
    let res = payload[1];
    let username = payload[2];
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

exports.updateMenu = function (userId, res, items){
    if(validate(userId)){
        res.status(200).end();
        ItemMapper.InsertIntoItem(null, [userId, items.name, items.price, items.caffeine], null)

    }else{
        res.status(400).end();
    }
}

exports.sellerGetHistoryOrder = function (payload, results){
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