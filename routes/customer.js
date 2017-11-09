var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("passport");
var session = require("express-session");


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
router.get("/signup", function(req, res, next) {
    res.render("signup");
});



module.exports = router;