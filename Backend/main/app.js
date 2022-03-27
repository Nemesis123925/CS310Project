const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const DrinkerService = require('../main/Service/DrinkerService')
const SellerService = require('../main/Service/SellerService')
const OrderService = require('../main/Service/OrderService')
//const _ = require("underscore")
//const Item = require("../main/Entity/Item")

//const seshTime = 1000 * 60 * 60 * 3; // 3 Hour Session Time

const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(cors());
app.use(express.json());
app.use(sessions({
    secret:"CSCI310Project",
    saveUninitialized:true,
    resave:false
}));

// indicates body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Cookie Parser

app.use(cookieParser());

const DrinkerRouter = require("./Router/DrinkerRouter").router
app.use("/drinker", DrinkerRouter);

const SellerRouter = require("./Router/SellerRouter").router
app.use("/seller", SellerRouter);

let onlineDrinkers = {}
let onlineSellers = {}

exports.getDrinkerSocket = function (drinker_id){
    let drinker_info = onlineDrinkers[drinker_id]
    if(!drinker_info.status){ // 0 means online
        return onlineDrinkers[drinker_id].socketId
    }return null
}
exports.getSellerSocket = function (seller_id){
    let seller_info = onlineSellers[seller_id]
    if(!seller_info.status){ // 0 means online
        return onlineSellers[seller_id].socketId
    }return null
}
io.on("connection", function (socket){
    socket.emit('success', 'connected to the server')

    socket.on('disconnect', (info) => {
        io.emit('quit', socket.id)
        if(info.isDrinker){
            onlineDrinkers[info.id].status = 1
        }else {
            onlineSellers[info.id].status = 1
        }
    })

    socket.on("online", info => {
        if(info.isDrinker){
            onlineDrinkers[info.id] = {
                socketId: socket.id,
                status: 0
            }
            DrinkerService.drinkerGetRecommendation1(socket, info.id)
        }else {
            onlineSellers[info.id] = {
                socketId: socket.id,
                status: 0
            }
            socket.emit("success", "online")
        }
        console.log(socket.id)
    })

    socket.on("order", orders => {
        if(!DrinkerService.validate(orders.drinker_id)){
            socket.emit("error", "drinker not validated")
        }else{
            orders.drinker_socket_id = onlineDrinkers[orders.drinker_id].socketId
            OrderService.recordOrder1(socket, orders);
            DrinkerService.drinkerCheckCaffeine(socket, orders)
        }
    })

    socket.on("update_delivery", trip => {
        if(!SellerService.validate(trip.seller_id)){
            socket.emit("error", "seller not validated")
        }else{
            socket.to(trip.drinker_socket_id).emit("update_delivery", trip)
        }
    })

    socket.on("finish_delivery", trip => {
        if(!SellerService.validate(trip.seller_id)){
            socket.emit("error", "seller not validated")
        }else{
            socket.to(trip.drinker_socket_id).emit("finish_delivery", trip)
            OrderService.finishOrder(trip)
        }
    })
})

// start listening
app.listen(3001,() => {
    console.log("Started on PORT 3001");
})

http.listen(3000)

