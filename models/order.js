module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        order_number: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: sequelize.UUIDV4
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
        },
        ship_to_address2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ship_to_state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ship_to_zip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_ordered: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_shipped: {
            type: DataTypes.DATE,
            allowNull: true
        },
        shipped_by: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        underscored: true,
        freezeTableName: true
    })


    Order.associate = function(models) {
        Order.belongsTo(models.Customer, { foreignKey: 'customer_id' });
        Order.hasMany(models.Product, { foreignKey: 'order_id' });
        Order.hasOne(models.Admin, { through: 'Shipped', foreignKey: 'order_id' });
    }
    return Order;
};
