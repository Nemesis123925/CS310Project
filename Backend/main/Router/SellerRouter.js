const express = require("express");
const SellerMapper = require("../Mapper/SellerMapper")
const SellerService = require("../Service/SellerService")
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
    //console.log(username);
    console.log("Receive sign up request from user:", username);
    SellerMapper.SelectSellerByUsername([res, username, password], username, SellerService.sellerSignup) // note the pass the response to adminMapper.js, to let it do the rest
});

// There may be need for a database entry to add admin users
exports.router = router