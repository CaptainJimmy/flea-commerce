module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
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
        }
    }, {
        underscored: true,
        freezeTableName: true
    });



    User.associate = function(models) {
        User.belongsToMany(models.Order, { through: 'Shipped', foreignKey: 'order_id' });
    }

    return User;
};