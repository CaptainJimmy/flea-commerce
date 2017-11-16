module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define('Customer', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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
