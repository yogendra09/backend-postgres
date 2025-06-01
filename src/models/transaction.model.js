// transaction.model.js
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('transaction', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => uuidv4()
        },
        orderId: {
            type: DataTypes.STRING,
            references: {
                model: 'order',
                key: 'id'
            },
            allowNull: false
        },
        userId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'userDetails',
                key: 'userId'
            },
            allowNull: false
        },
        addressId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'UserAddress',
                key: 'id'
            },
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.ENUM,
            values: ['paypal', 'cod', 'other'],
            allowNull: false,
            defaultValue: 'paypal'
        },
        transactionId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING(3),
            allowNull: false,
            defaultValue: 'USD'
        },
        paymentStatus: {
            type: DataTypes.ENUM,
            values: ['pending', 'completed', 'failed', 'refunded'],
            allowNull: false,
            defaultValue: 'pending'
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
        tableName: 'transaction',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['transactionId']
            }
        ]
    });
    
    return Transaction;
};