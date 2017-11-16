var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("passport");
var session = require("express-session");


// GET route for getting all of the Products


router.get('/', function(req, res, next) {
    db.Product.findAll({})
        .then(function(dbProducts) {
            //res.json(dbProducts);
            res.render('products', { product: dbProducts });
        });
});


// Get route for retrieving a single Product
router.get("/:id", function(req, res) {
    db.Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbProduct) {
            res.render('detail', { product: dbProduct });
        });
});




module.exports = router;