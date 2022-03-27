const express = require("express");
const DrinkerMapper = require("../Mapper/DrinkerMapper")
const DrinkerService = require("../Service/DrinkerService")
const SellerMapper = require("../Mapper/SellerMapper")
const ItemMapper = require("../Mapper/ItemMapper")
const OrderMapper = require("../Mapper/OrderMapper")
const router = express.Router();

// signup functionality, call the addUser function in adminMapper.js.
router.post("/login",(req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    //console.log(username);
    console.log("Receive log in request from user:", username);
    DrinkerMapper.SelectDrinkerByUsername([req, res, username, password], username ,DrinkerService.drinkerLogin) // note the pass the response to adminMapper.js, to let it do the rest
});

router.post("/signup", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    //console.log(username);
    console.log("Receive sign up request from user:", username);
    DrinkerMapper.SelectDrinkerByUsername([res, username, password], username, DrinkerService.drinkerSignUp) // note the pass the response to adminMapper.js, to let it do the rest
});

router.post("/get_near_by_sellers", (req, res) => {
    let userId = req.session.userId
    let location = req.body.location;
    location = JSON.parse(location)
    //console.log(location.latitude);
    console.log("Receive get sellers request from user:", userId);
    SellerMapper.SelectNearBySeller([res, userId], location.latitude, location.longitude, DrinkerService.drinkerGetNearBySeller) // note the pass the response to adminMapper.js, to let it do the rest
})

router.post("/get_menu", (req, res) => {
    let userId = req.session.userId
    let seller_id = req.body.seller_id;
    //console.log(location.latitude);
    console.log("Receive get menu request from user:", userId);
    ItemMapper.SelectItemsBySellerId([res, userId], seller_id, DrinkerService.drinkerGetMenu) // note the pass the response to adminMapper.js, to let it do the rest
})

router.post("/get_history_order", (req, res) => {
    let userId = req.session.userId
    //console.log(location.latitude);
    console.log("Receive get history order request from drinker:", userId);
    OrderMapper.SelectOrdersByDrinkerId(res, userId, DrinkerService.drinkerGetHistoryOrder) // note the pass the response to adminMapper.js, to let it do the rest
})

// There may be need for a database entry to add admin users
exports.router = router