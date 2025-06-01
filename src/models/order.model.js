// order.model.js
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => uuidv4(),
      },
      userId: {
        type: DataTypes.BIGINT,
        references: {
          model: "userDetails",
          key: "userId",
        },
        allowNull: false,
      },
      addressId: {
        type: DataTypes.BIGINT,
        references: {
          model: "UserAddress",
          key: "id",
        },
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.ENUM,
        values: ["cod", "online", "paypal"],
        allowNull: false,
        defaultValue: "cod",
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: [
          "processing",
          "placed",
          "cancelled",
          "shipped",
          "delivered",
          "refund-completed",
        ],
        allowNull: false,
        defaultValue: "processing",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Order;
};
