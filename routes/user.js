var express = require('express');
var router = express.Router();
var user = require("../models/user");

router.get('/', function(req, res, next) {
    if (req.user) {
        res.redirect("/customer");
    }
    res.send('/signup');
});

router.get('/login', function(req, res, next) {
    if (req.user) {
        res.redirect("/customer");
    }
    res.send('/login');
});

router.get('/customer', isAuthenticated, function (req, res, next) {
    res.render('/customer');
});

module.exports = router;

