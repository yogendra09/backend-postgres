module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('orderItem', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true, // Enable auto-increment
            allowNull: false
        },
        orderId: {
            type: DataTypes.STRING,
            references: {
                model: 'order',
                key: 'id'
            },
            allowNull: false
        },
        productId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'Products',
                key: 'id'
            },
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'orderItem',
        timestamps: true
    });

    return OrderItem;
};
