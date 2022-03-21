const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

//const seshTime = 1000 * 60 * 60 * 3; // 3 Hour Session Time

const app = express();

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


// bind app with router
// For session testing below:
/*app.get('/',(req,res)=>
{
    if(req.session.userId) {
        res.send(req.session.userId + " is logged in")
        //console.log(req.session)
        console.log("Logged in")
    }
    else {
        console.log(req.session)
        res.send("Currently not logged in");
        console.log("Not Logged in");
    }
});*/
// start listening
app.listen(3001,() => {
    console.log("Started on PORT 3001");
})

