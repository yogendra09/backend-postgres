// models/subAdmin.js
module.exports = (sequelize, DataTypes) => {
    const SubAdminSchema = sequelize.define("subAdmin", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        adminId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
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
    }, {
        timestamps: true
    });
    return SubAdminSchema;
};