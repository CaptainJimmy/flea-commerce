var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("passport");
var session = require("express-session");


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('error');
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/authenticate', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',

    failureRedirect: '/login'
}));

router.get("/signup", function(req, res, next) {
    res.render("signup");
});
router.post("/create", passport.authenticate('local-signup', {
    successRedirect: '/dashboard',

    failureRedirect: '/signup'
}));

router.get("/logout", (req, res) => {
            req.session.destroy(function(err) {
                res.redirect("/");
            });
        };

        module.exports = router;