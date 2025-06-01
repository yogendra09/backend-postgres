const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const passwordSchema = sequelize.define("password", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'userDetails',
                key: 'userId',
            }
        },
        adminId:{
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'adminDetails',
                key: 'adminId',
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(value, salt);
                console.log(hash);
                this.setDataValue('password', hash);
            },
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
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['userId']
            }
        ]
    });

    return passwordSchema;
};
