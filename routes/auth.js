var authController = require("../controllers/authcontroller.js");
var express = require("express");
var router = express.Router();
var db = require("../models");
var passport = require("passport");
var session = require("express-session");

router.get("/", authController.signin);

router.get("/signup", authController.signup);

router.get("/signin", authController.signin);

router.post(
    "/signup",
    passport.authenticate("local-signup", {
        successRedirect: "/test/dashboard",
        failureRedirect: "/test/signup"
    })
);

router.get("/dashboard", isLoggedIn, authController.dashboard);

router.get("/logout", authController.logout);

router.post(
    "/signin",
    passport.authenticate("local-signin", {
        successRedirect: "/dashboard",
        failureRedirect: "/signin"
    })
);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
}

module.exports = router;