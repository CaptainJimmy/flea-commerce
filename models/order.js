module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        order_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        items: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shipping_charges: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ship_to_address1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        ship_to_address2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ship_to_state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$", "i"],
                len: [2, 2]
            }
        },
        ship_to_zip: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                not: ["[a-z]", "i"],
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
        date_ordered: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_shipped: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });

    //need help with this
    Order.hasOne(Customer, { as: 'username', foreignKey: 'username' })
    Order.associate = function(models) {
        // NEED HELP WITH THIS
        Order(models.Customer, {
                foreignKey: past_orders
                targetKey: order_number
            }
        });
};

return Order;
};