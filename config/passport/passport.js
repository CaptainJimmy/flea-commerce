var bCrypt = require("bcrypt-nodejs");
console.log("testing1234");
//testing1234
//test
module.exports = function(passport, customer) {
    var Customer = customer;
    console.log("got here");

    var LocalStrategy = require("passport-local").Strategy;

    passport.use("local-signup", new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            Customer.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
                        message: "That email is already taken"
                    });
                } else {
                    var userPassword = generateHash(password);

                    var data = {
                        username: req.body.username,
                        customer_name: req.body.customer_name,
                        address1: req.body.address1,
                        address2: req.body.address2,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        email: email,
                        password: userPassword
                    };
                    console.log(data);
                    Customer.create(
                        data
                    ).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    }).error(function(error) { console.log(error) });
                }
            });
        }
    ));
    //serialize
    passport.serializeUser(function(customer, done) {
        done(null, user.id);
    });
    // deserialize user
    passport.deserializeUser(function(id, done) {
        Customer.findById(id).then(function(customer) {
            if (user) {
                done(null, customer.get());
            } else {
                done(customer.errors, null);
            }
        });
    });
};