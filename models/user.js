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
        {
            underscored: true,
            freezeTableName: true,
            classMethods: {
                associate: function(models) {
                    User.belongsToMany(models.Order, { through: 'Shipped', foreignKey: 'order_id' });
                }
            }
        }
    });

    return Users;
};