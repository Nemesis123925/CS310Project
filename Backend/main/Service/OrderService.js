const OrderMapper = require("../Mapper/OrderMapper");
const FrequencyMapper = require("../Mapper/FrequencyMapper")
let _ = require("underscore")

exports.recordOrder1 = function (socket, order){
    let seller_id = order.orders[0].seller_id;
    updateFrequency1(order.drinker_id, order.orders)
    let orders = JSON.stringify(order.orders)
    let time = new Date()
    OrderMapper.InsertIntoOrders([socket, order], [order.drinker_id, seller_id, time, orders], recordOrder2)
}

function recordOrder2(payload, results){
    let socket = payload[0]
    let order = payload[1]
    results = JSON.parse(JSON.stringify(results)) // just parsing
    order.order_id = results.insertId
    socket.to(order.seller_socket_id).emit("receive_order", order)
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

exports.finishOrder = function (trip){
    let order_id = trip.order_id
    OrderMapper.UpdateFinishTimeByOrderId(null, [new Date(), order_id], null)
}