module.exports = (sequelize, DataTypes) => {
    const UserSchema = sequelize.define("userDetails", {
        id:{
            type: DataTypes.UUID, // Using UUID for better uniqueness
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        userId: {
            type: DataTypes.BIGINT, // BIGSERIAL equivalent for PostgreSQL
            autoIncrement: true,
            primaryKey: true
        },
        googleId:{
            type: DataTypes.STRING(255),
            allowNull: true,
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
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'suspended','block'],
            allowNull: false,
            defaultValue: 'active'
        },
        avatar: {
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

    return UserSchema;
};
