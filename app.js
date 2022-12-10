const express = require("express");

const router = require("./src/router/api");

const app = new express();
const bodyParser = require("body-parser");

// Security import
const reteLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Security implement ------------------->>>>
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// bodyParser Implement ------------------->>>
app.use(bodyParser.json());

// Request reteLimit implement ----------->>>>
const  rateLimit = reteLimit({ windowMs: 15 * 60 * 1000, max: 2000 });
app.use(rateLimit)

// import mongoose for database Connection
const mongoose = require("mongoose");

let URL = "mongodb://127.0.0.1:27017/User";
let Option = { user: "", pass: "", autoIndex: true };
mongoose.connect(URL,Option, (err) => {
    if (err) {
        console.log("MongoDB Connection Fail");
    } else {
        console.log("MongoDB Connection Success");
    }
});
// router implement for api & 404 page
app.use("/api/v1", router);

app.use("*", (req, res) => {
    res.status(404).json({ Status: "Page not Found" });
});




// exports for index.js file
module.exports = app;
