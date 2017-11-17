var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require("passport");
var session = require("express-session");
//var authController = require("../controllers/authcontroller.js");

/* GET users listing. */
router.get('/', function(req, res, next) {

    res.render('admin', { consoleChoice: "true" });
});

router.get('/products', (req, res, next) => {
    db.Product.findAll({}).then((data) => {
        res.render('admin', { consoleChoice: "false", adminType: "products", adminCommand: "showAll", product: data });

    });
});
router.get('/products/:id', (req, res, next) => {
    var prod = req.params.id;
    db.Product.findOne({
        where: {
            id: prod
        }
    }).then((data) => {
        //console.log(data)
        res.render('admin', { consoleChoice: "false", adminType: "products", adminCommand: "edit", product: data });

    });
});
router.put('/products/:id', (req, res, next) => {
    if (!req.params.id) {
        var err = new Error('Not Found, No ID');
        err.status = 404;
        next(err);
    }

    db.Product.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .catch((error) => {
            var err = new Error(error);
            err.status = 404;
            next(err);
        })
});
router.delete("/products/:id", (req, res, next) => {
    if (!req.params.id) {
        var err = new Error("Not Found, No ID");
        err.status = 404;
        next(err);
    }
    db.Product
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then(productsPost => {
            res.json(productsPost);
        })
        .catch(err => {
            res.json(err);
        });
});
router.get('/customers', (req, res, next) => {
    db.Customer.findAll({}).then((data) => {
        res.render('admin', { consoleChoice: "false", adminType: "customers", adminCommand: "showAll", customer: data });

    });
});

router.get('/customers/:id', function(req, res, next) {

    db.Customer.findOne({
        where: {
            id: req.params.id
        }
    }).then((data) => {
        res.render('admin', { consoleChoice: "false", adminType: "customers", adminCommand: "edit", customer: data });
    }).error((error) => {
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    })
});
router.put('/customers/:id', (req, res, next) => {
    if (!req.params.id) {
        var err = new Error('Not Found, No ID');
        err.status = 404;
        next(err);
    }
    db.Customer.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then((productsPost) => {
            res.json(productsPost);
        })
});

router.delete("/customers/:id", (req, res, next) => {
    if (!req.params.id) {
        var err = new Error("Not Found, No ID");
        err.status = 404;
        next(err);
    }
    db.Customer
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then((productsPost) => {
            res.json(productsPost);
        }).catch((err) => {
            res.json(err)
        });
});
router.get("/addproduct", function(req, res, next) {
    res.render("addproduct");
});
// Product route for saving a new Product
router.post("/addproduct", function(req, res) {
    db.Product
        .create(req.body, {})
        .then(function(dbProduct) {
            res.redirect("products");
        });
});

module.exports = router;
