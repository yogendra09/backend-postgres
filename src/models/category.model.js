module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [2, 50] // Name length between 2 and 50 characters
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        // slug: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true
        // },
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
        // Additional model options
        tableName: 'category',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['name']
            },
            // {
            //     unique: true,
            //     fields: ['slug']
            // }
        ]
    });

    return Category;
};