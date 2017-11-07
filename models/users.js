module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 20]
            }
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        shipping: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    });

    return Users;
};