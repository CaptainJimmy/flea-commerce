var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("passport");
var session = require("express-session");


// GET route for getting all of the Products


router.get('/', function(req, res, next) {
    db.Product.findAll({})
        .then(function(dbProducts) {
            res.json(dbProducts);
        });
});


// Get route for retrieving a single Product
router.get("/products/:id", function(req, res) {
    db.Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbProduct) {
            res.json(dbProduct);
        });
});

router.get("/add", function(req, res, next) {
    res.render("addproduct");
});
// Product route for saving a new Product
router.post("/add", function(req, res) {
    console.log(req.body);
    db.Product.create({
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_price: req.body.product_price,
            qty_on_hand: req.body.qty_on_hand,
            image: req.body.image,
        })
        .then(function(dbProduct) {
            res.redirect('products');
        });
});

// DELETE route for deleting Products
router.delete("/products/:id", function(req, res) {
    db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbProduct) {
            res.json(dbProduct);
        });
});

// PUT route for updating Products
router.put("/products", function(req, res) {
    db.Product.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        .then(function(dbProduct) {
            res.json(dbProduct);
        });
});

module.exports = router;