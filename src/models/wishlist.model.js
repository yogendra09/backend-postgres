module.exports = (sequelize, DataTypes) => {
    const UserWishlist = sequelize.define("UserWishlist", {
        wishlistId: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true
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
    return UserWishlist;
};