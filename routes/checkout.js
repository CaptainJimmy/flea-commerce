var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("passport");
var session = require("express-session");

router.get('/', function (req, res, next) {
  res.render("checkout");
});

module.exports = router;