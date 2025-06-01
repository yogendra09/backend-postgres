module.exports = (sequelize, DataTypes) => {
    const WishlistItem = sequelize.define("WishlistItem", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        wishlistId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        productId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    });

    return WishlistItem;
};