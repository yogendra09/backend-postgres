module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    imageUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING(500)),
      allowNull: false,
      defaultValue: [],
    },
    cloudinaryIds: {
      type: DataTypes.ARRAY(DataTypes.STRING(255)),
      allowNull: true,
      defaultValue: [], 
    },
    productId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "category",
        key: "id",
      },
    },
    SKU: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Supports decimal values
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });

  return Product;
};
