module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define("CartItem", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        cartId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        productId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
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

    return CartItem;
};
