var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var sequelize = require('sequelize');

var instanceMethods = {
    getGravatarUrl: function (size) {
        if (!size) size = 200;

        if (!this.email) {
            return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
        }

        var md5 = crypto.createHash('md5').update(this.email).digest('hex');
        return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
    },
    getProfilePicture: function (size) {
        if (this.profile && this.profile.picture != null)
            return this.profile.picture;

        return this.getGravatarUrl(size);
    },
    hasSetPassword: function () {
        return this.password != null && this.password.length > 0;
    }
};

var beforeSaveHook = function (user, options, fn) {
    if (user.changed('password')) {
        this.encryptPassword(user.password, function (hash, err) {
            user.password = hash;
            fn(null, user);
        });
        return;
    }
    fn(null, user);
};

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: [5]
        },
        passwordResetToken: {
            type: DataTypes.STRING,
            unique: true
        },
        passwordResetExpires:{
            type: DataTypes.DATE,
        },
        googleId: {
            type: DataTypes.STRING,
            unique: true
        },
        githubId: {
            type: DataTypes.STRING,
            unique: true
        },
        tokens: {
            type: DataTypes.STRING,
            unique: true
        }, 
        profile: {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            zip: DataTypes.STRING,
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, 
        
        tableName: "users",
        instanceMethods: instanceMethods,
        classMethods: {
                associate: function (models) {

                },
                encryptPassword: function (password, cb) {
                    if (!password) {
                        cb('', null);
                        return;
                    }

                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) { cb(null, err); return; }
                        bcrypt.hash(password, salt, null, function (hErr, hash) {
                            if (hErr) { cb(null, hErr); return; }
                            cb(hash, null);
                        });
                    });
                },
                findUser: function (email, password, cb) {
                    User.findOne({
                        where: { email: email }
                    })
                        .then(function (user) {
                            if (user == null || user.password == null || user.password.length === 0) {
                                cb('User / Password combination is not correct', null);
                                return;
                            }
                            bcrypt.compare(password, user.password, function (err, res) {
                                if (res)
                                    cb(null, user);
                                else
                                    cb(err, null);
                            });
                        })
                        .catch(function (err) { cb(err, null); });
                }
            },
            hooks: {
                beforeUpdate: beforeSaveHook,
                beforeCreate: beforeSaveHook
            },
            indexes: [
                {
                    name: 'googleIdIndex',
                    method: 'BTREE',
                    fields: ['googleId']
                },
                {
                    name: 'githubIdIndex',
                    method: 'BTREE',
                    fields: ['githubId']
                }
            ]
        });

    User.associate = function(models) {
        User.belongsToMany(models.Order, { through: 'Shipped', foreignKey: 'order_id' });
    };

    return User;
};