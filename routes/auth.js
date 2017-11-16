var express = require("express");
var router = express.Router();
var models = require("../models");
var passport = require("passport");
var session = require("express-session");
require("../config/passport/passport.js")(passport, Customer);
router.get("/", (req, res, next) => {
    res.render("signup");
});

router.get("/signup", (req, res, next) => {
    res.render("signup");
});

router.get("/signin", (req, res, next) => {
    res.render("signin");
});

router.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/test/dashboard",
    failureRedirect: "/test/signup"
}));

router.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard");
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
});

router.post(
    "/signin",
    passport.authenticate("local-signin", {
        successRedirect: "/test/dashboard",
        failureRedirect: "/test/signin"
    })
);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
}

module.exports = router;