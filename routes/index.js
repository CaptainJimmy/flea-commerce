var express = require('express');
var router = express.Router();
var Sequelize = require("sequelize");
var db = require("../models");


/* GET home page. */
router.get('/', function(req, res) {
    db.Product.findAll({
        limit: 3,
        order: [
            [Sequelize.fn('RAND', '')]
        ]
    }).then(function(dbProducts) {
        //res.json(dbProducts);
        res.render("index", { product: dbProducts });
    });
    //res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
    // Render __dirname/views/login.pug
    res.render('login', { title: 'login' });
});


module.exports = router;