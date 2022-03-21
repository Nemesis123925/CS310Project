const SellerMapper = require("../Mapper/SellerMapper");

let validUsers = new Set();

exports.sellerSignup = function(payload, results){
    let res = payload[0]
    let username = payload[1];
    let password = payload[2];
    results = JSON.parse(JSON.stringify(results)) // just parsing
    if(results.length){ // means this username already exists
        res.status(400).end();
        return;
    }res.status(200).end();
    SellerMapper.InsertIntoSeller(null, [username, password], null);
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
        let userId = username + Math.floor(Math.random() * 10000);
        req.session.userId = userId;
        validUsers.add(userId)
        //console.log(req.session)
        res.status(200).end();
    }else{
        res.status(400).end();
    }
}