module.exports = (sequelize, DataTypes) => {
    const AdminSchema = sequelize.define("adminDetails", {
        id:{
            type: DataTypes.UUID, // Using UUID for better uniqueness
            defaultValue: DataTypes.UUIDV4,
            allowNull: true
        },
        adminId: {
            type: DataTypes.BIGINT, // BIGSERIAL equivalent for PostgreSQL
            autoIncrement: true,
            primaryKey: true
        },
        departmentId: {
            type : DataTypes.BIGINT,
            allowNull: false
        },
        roleId:{
            type : DataTypes.BIGINT,
            allowNull: false
        },
        parentAdminId: {
            type: DataTypes.BIGINT, // References the adminId of the parent admin
            allowNull: true, // Allow null for top-level admins (not sub-admins)
            references: {
                model: "adminDetails", // Self-referential to the same table
                key: "adminId",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL", // If parent admin is deleted, set parentAdminId to NULL
        },
       name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        mobileNumber: {
            type: DataTypes.STRING(12),
            allowNull: true,
        },
        mobileVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        picture: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        emailAddress: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        isResetCode: {
            type: DataTypes.BOOLEAN, // Changed to BOOLEAN instead of INTEGER
            defaultValue: false
        },
        code: {
            type: DataTypes.UUID, // Using UUID for better uniqueness
            defaultValue: DataTypes.UUIDV4,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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
        timestamps: true, // Enables Sequelize’s automatic timestamps
    });

    return AdminSchema;
};
