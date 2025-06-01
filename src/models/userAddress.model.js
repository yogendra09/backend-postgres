module.exports = (sequelize, DataTypes) => {
    const UserAddress = sequelize.define("UserAddress", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        label: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        address_line1: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address_line2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        zipCode: {
            type: DataTypes.STRING(20),
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
    },
    {
        freezeTableName: true, // Prevents pluralization
    });

    return UserAddress;
};















// module.exports = (sequelize,DataTypes)=>{

//     const UserAddress = sequelize.define("UserAddress",{
//         id:{
//             type:DataTypes.BIGINT,
//             autoIncrement:true,
//             primaryKey:true
//         },
//         label:{
//             type:DataTypes.STRING(255),
//             allowNull:false
//         },
//         userId:{
//             type:DataTypes.BIGINT,
//             allowNull:false
//         },
//         address_line1:{
//             type:DataTypes.TEXT,
//             allowNull:false
//         },
//         address_line2:{
//             type:DataTypes.TEXT,
//             allowNull:false
//         },
//         city:{
//             type:DataTypes.STRING(255),
//             allowNull:false
//         },
//         state:{
//             type:DataTypes.STRING(255),
//             allowNull:false
//         },
//         country:{
//             type:DataTypes.STRING(255),
//             allowNull:false
//         },
//         zipCode:{
//             type:DataTypes.STRING(255),
//             allowNull:false
//         },
//         createdAt:{
//             type:DataTypes.DATE,
//             defaultValue:DataTypes.NOW,
//             allowNull:false
//         },
//         updatedAt:{
//             type:DataTypes.DATE,
//             defaultValue:DataTypes.NOW,
//             allowNull:false
//         }
//     },
//     {
//         freezeTableName: true, // Prevents pluralization
//     });

//     return UserAddress;

// }