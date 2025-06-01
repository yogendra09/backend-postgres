
module.exports = (sequelize, DataTypes) => {
    const RoleSchema = sequelize.define("role", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        adminId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        permissionIds: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: []
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
    return RoleSchema;
};