var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("passport");
var session = require("express-session");
//var authRoute = require("./auth.js")(app);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('error');
});
router.get('/authenticate', function(req, res, next) {
    res.send('error');
});
router.post("/create", function(req, res, next) {
    res.send("error");
});




module.exports = router;