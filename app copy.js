// Module dependencies.
var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var favicon = require('serve-favicon');
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var passport = require('passport');

// Load models and connect to mysql
var db = require("./models");
var MySQLStore = require('connect-mysql')({ session: session });

// Load .env variables
dotenv.load({ path: '.env.example' });

// Controllers 
var indexController = require('./controllers/index');
var userController = require('./controllers/user');
var adminController = require("./controllers/admin");
var checkoutController = require('./controllers/checkout');
var contactController = require('./controllers/contact');
var customerController = require('./controllers/customer');
var productController = require('./controllers/product');

// API Keys and Passport
var passportConfig = require('./config/passport');

// Create Express Server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', index);
app.use('/user', user);
app.use('/customer', customer);
app.use('/product', product);
app.use('/test', authRoute);
app.use('/admin', admin);

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Error Handler
app.use(errorHandler());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

db
    .sequelize
    .sync({ force: true })
    .then(function () {
        app.listen(app.get('port'), function () {
            console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
        });
    });

module.exports = app;
