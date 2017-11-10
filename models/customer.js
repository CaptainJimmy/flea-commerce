module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define('Customer', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 2]
            }
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 5]
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
        past_orders: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        underscored: true,
        freezeTableName: true
    })



    Customer.associate = function(models) {
        Customer.hasMany(models.Order, { foreignKey: 'customer_order_id' });
    }
    return Customer;
};