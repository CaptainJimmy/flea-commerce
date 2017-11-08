module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        product_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        qty_on_hand: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Product;
};