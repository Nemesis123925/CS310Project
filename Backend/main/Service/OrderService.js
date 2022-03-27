const OrderMapper = require("../Mapper/OrderMapper");
const FrequencyMapper = require("../Mapper/FrequencyMapper")
let _ = require("underscore")

exports.recordOrder = function (order){
    let seller_id = order.orders[0].seller_id;
    updateFrequency1(order.drinkerID, order.orders)
    let orders = JSON.stringify(order.orders)
    let time = new Date()
    OrderMapper.InsertIntoOrders(null, [order.drinkerID, seller_id, time, orders], null)
}

function updateFrequency1(drinker_id, items){
    _.each(items, function (item){
        let stringifies = JSON.stringify(item)
        FrequencyMapper.SelectFrequency([drinker_id, stringifies], [drinker_id, stringifies], updateFrequency2)
    })
}

function updateFrequency2(payload, results){
    results = JSON.parse(JSON.stringify(results)) // just parsing
    let drinker_id = payload[0]
    let item = payload[1]
    if(!results.length){ // first time, then insert
        FrequencyMapper.InsertIntoFrequency(null, [drinker_id, item, 1], null)
    }else{
        FrequencyMapper.UpdateFrequency(null, results[0].id, null)
    }
}