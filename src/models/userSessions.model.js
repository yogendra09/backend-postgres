module.exports = (sequelize, DataTypes) => {
    const userSessions = sequelize.define("userSessions", {
        id: {
            type: DataTypes.BIGINT, 
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.BIGINT, 
            allowNull: false,
            references: {
                model: 'userDetails',
                key: 'userId'
            }
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: true
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
                name: 'userId_index',
                fields: ['userId']
            },
        ],
    });

    return userSessions;
};
