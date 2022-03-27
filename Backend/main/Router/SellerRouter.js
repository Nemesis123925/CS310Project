const express = require("express");
const SellerMapper = require("../Mapper/SellerMapper")
const SellerService = require("../Service/SellerService")
const OrderMapper = require("../Mapper/OrderMapper");
const DrinkerService = require("../Service/DrinkerService");
const router = express.Router();

// signup functionality, call the addUser function in adminMapper.js.
router.post("/login",(req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    //console.log(username);
    console.log("Receive log in request from user:", username);
    SellerMapper.SelectSellerByUsername([req, res, username, password], username, SellerService.sellerLogin) // note the pass the response to adminMapper.js, to let it do the rest
});

router.post("/signup", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let location = req.body.location;
    console.log(location)
    //console.log(username);
    console.log("Receive sign up request from user:", username);
    SellerMapper.SelectSellerByUsername([res, username, password, location], username, SellerService.sellerSignup) // note the pass the response to adminMapper.js, to let it do the rest
});

router.post("/update_menu", (req, res) => {
    let userId = req.session.userId
    let items = req.body.items;
    items = JSON.parse(items)
    //console.log(username);
    console.log("Receive update menu request from user:", userId);
    SellerService.updateMenu(userId, res, items) // note the pass the response to adminMapper.js, to let it do the rest
});

router.post("/get_history_order", (req, res) => {
    let userId = req.session.userId
    //console.log(location.latitude);
    console.log("Receive get history order request from seller:", userId);
    OrderMapper.SelectOrdersBySellerId(res, userId, SellerService.sellerGetHistoryOrder) // note the pass the response to adminMapper.js, to let it do the rest
})

// There may be need for a database entry to add admin users
exports.router = router