module.exports = (sequelize, DataTypes) => {
    const UserCart = sequelize.define("UserCart", {
        cartId: {
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
    return UserCart;
};
