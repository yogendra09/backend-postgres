const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

module.exports = () => {
  const db = initializeDatabase(dbConfig);
  const models = [
    // ADMIN
    { name: "AdminModel", path: "../src/models/admin.model.js" },

    // USER
    { name: "UserModel", path: "../src/models/user.model.js" },
    { name: "PasswordModel", path: "../src/models/password.model.js" },
    { name: "UserSessionsModel", path: "../src/models/userSessions.model.js" },
    { name: "UserAddressModel", path: "../src/models/userAddress.model.js" },
    { name: "CartModel", path: "../src/models/cart.model.js" },
    { name: "ProductModel", path: "../src/models/product.model.js" },
    { name: "CartItemModel", path: "../src/models/cartItem.model.js" },
    { name: "CategoryModel", path: "../src/models/category.model.js" },

    { name: "WishListModel", path: "../src/models/wishlist.model.js" },
    { name: "WishListItemModel", path: "../src/models/wishlistItem.model.js" },

    // ORDER AND TRANSACTION
    { name: "OrderModel", path: "../src/models/order.model.js" }, // Add Order model
    { name: "OrderItemModel", path: "../src/models/orderItem.model.js" }, // Add OrderItem model
    { name: "TransactionModel", path: "../src/models/transaction.model.js" }, // Add Transaction model

    {name: "RoleModel", path: "../src/models/role.model.js" }, //
    {name: "DepartmentModel", path: "../src/models/department.model.js" }, //
    {name: "PermissionModel", path: "../src/models/permissions.model.js" }, //
    {name: "SubAdminModel", path: "../src/models/subAdmin.model.js" }

    
  ];

  models.forEach((model) => {
    db[model.name] = require(model.path)(db.sequelize, Sequelize);
  });

  defineAssociations(db);
  return { db };
};

function initializeDatabase(config) {
  return {
    Sequelize,
    sequelize: new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.HOST,
        dialect: config.dialect,
        timezone: config.timezone,
        pool: {
          max: config.pool.max,
          min: config.pool.min,
          acquire: config.pool.acquire,
          idle: config.pool.idle,
        },
      }
    ),
  };
}

// function initializeDatabase(config) {
//     return {
//         Sequelize,
//         sequelize: new Sequelize(config.database, config.username, config.password, {
//             host: config.HOST,
//             port: config.port,
//             dialect: config.dialect,
//             timezone: config.timezone,
//             pool: {
//                 max: config.pool.max,
//                 min: config.pool.min,
//                 acquire: config.pool.acquire,
//                 idle: config.pool.idle
//             },
//             dialectOptions: {
//                 ssl: {
//                     require: true,
//                     rejectUnauthorized: false
//                 }
//             },
//             ssl: true
//         })
//     };
// }

function defineAssociations(db) {
  //ADMIN
  db.AdminModel.hasOne(db.PasswordModel, {
    foreignKey: "adminId",
    as: "password",
  });
  db.PasswordModel.belongsTo(db.AdminModel, {
    foreignKey: "adminId",
    as: "admin",
  });

  // Associations
  db.DepartmentModel.hasMany(db.RoleModel, { foreignKey: 'departmentId' });
  db.RoleModel.belongsTo(db.DepartmentModel, { foreignKey: 'departmentId' });
  
  db.SubAdminModel.belongsTo(db.AdminModel, { foreignKey: 'adminId' });
  db.SubAdminModel.belongsTo(db.RoleModel, { foreignKey: 'roleId' });
  db.AdminModel.hasMany(db.SubAdminModel, { foreignKey: 'adminId' });
  db.RoleModel.hasMany(db.SubAdminModel, { foreignKey: 'roleId' });
  

  // USER
  db.UserModel.hasOne(db.PasswordModel, {
    foreignKey: "userId",
    as: "password",
  });
  db.PasswordModel.belongsTo(db.UserModel, {
    foreignKey: "userId",
    as: "user",
  });
  db.UserModel.hasMany(db.UserSessionsModel, {
    foreignKey: "userId",
    as: "tokens",
  });
  db.UserSessionsModel.belongsTo(db.UserModel, {
    foreignKey: "userId",
    as: "user",
  });
  db.UserModel.hasMany(db.UserAddressModel, {
    foreignKey: "userId",
    as: "addresses",
  });
  db.UserAddressModel.belongsTo(db.UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  db.UserModel.hasOne(db.CartModel, { foreignKey: "userId", as: "cart" });
  db.CartModel.belongsTo(db.UserModel, { foreignKey: "userId", as: "user" });
  db.CartModel.hasMany(db.CartItemModel, { foreignKey: "cartId", as: "items" });
  db.CartItemModel.belongsTo(db.CartModel, {
    foreignKey: "cartId",
    as: "cart",
  });
  db.ProductModel.hasMany(db.CartItemModel, {
    foreignKey: "productId",
    as: "items",
  });
  db.CartItemModel.belongsTo(db.ProductModel, {
    foreignKey: "productId",
    as: "product",
  });
  db.CategoryModel.hasMany(db.ProductModel, {
    foreignKey: "categoryId",
    as: "products",
  });
  db.ProductModel.belongsTo(db.CategoryModel, {
    foreignKey: "categoryId",
    as: "category",
  });

  // UserWishlist associations
  db.UserModel.hasOne(db.WishListModel, {
    foreignKey: "userId",
    as: "wishlist",
  });
  db.WishListModel.belongsTo(db.UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  // Each wishlist can have multiple wishlist items
  db.WishListModel.hasMany(db.WishListItemModel, {
    foreignKey: "wishlistId",
    as: "items",
  });
  db.WishListItemModel.belongsTo(db.WishListModel, {
    foreignKey: "wishlistId",
    as: "wishlist",
  });

  // Each wishlist item is linked to a product
  db.WishListItemModel.belongsTo(db.ProductModel, {
    foreignKey: "productId",
    as: "product",
  });
  db.ProductModel.hasMany(db.WishListItemModel, {
    foreignKey: "productId",
    as: "wishlistItems",
  });

  // ORDER AND ORDERITEM ASSOCIATIONS
  // Order and User
  db.UserModel.hasMany(db.OrderModel, { foreignKey: "userId", as: "orders" });
  db.OrderModel.belongsTo(db.UserModel, { foreignKey: "userId", as: "user" });

  // // Order and UserAddress
  db.OrderModel.belongsTo(db.UserAddressModel, {
    foreignKey: "addressId",
    as: "address",
  });
  db.UserAddressModel.hasMany(db.OrderModel, {
    foreignKey: "addressId",
    as: "orders",
  });

  // // Order and OrderItem (one-to-many)
  db.OrderModel.hasMany(db.OrderItemModel, {
    foreignKey: "orderId",
    as: "items",
  });
  db.OrderItemModel.belongsTo(db.OrderModel, {
    foreignKey: "orderId",
    as: "order",
  });

  // // Product and OrderItem (one-to-many)
  db.ProductModel.hasMany(db.OrderItemModel, {
    foreignKey: "productId",
    as: "orderItems",
  });
  db.OrderItemModel.belongsTo(db.ProductModel, {
    foreignKey: "productId",
    as: "product",
  });

  // // TRANSACTION ASSOCIATIONS
  // // Transaction and Order (one-to-one)
  db.OrderModel.hasOne(db.TransactionModel, {
    foreignKey: "orderId",
    as: "transaction",
  });
  db.TransactionModel.belongsTo(db.OrderModel, {
    foreignKey: "orderId",
    as: "order",
  });

  // // Transaction and User
  db.UserModel.hasMany(db.TransactionModel, {
    foreignKey: "userId",
    as: "transactions",
  });
  db.TransactionModel.belongsTo(db.UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  // // Transaction and UserAddress
  db.TransactionModel.belongsTo(db.UserAddressModel, {
    foreignKey: "addressId",
    as: "address",
  });
  db.UserAddressModel.hasMany(db.TransactionModel, {
    foreignKey: "addressId",
    as: "transactions",
  });

  db.OrderItemModel.belongsTo(db.ProductModel, {
    foreignKey: 'productId',
    as: 'productInfo' // <- use a unique alias
  });
  
}
