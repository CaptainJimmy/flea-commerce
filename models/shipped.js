module.exports = function(sequelize, DataTypes) {
    var Shipped = sequelize.define(
        "Shipped", {}, {
            underscored: true,
            freezeTableName: true
        }
    );
    return Shipped;
};