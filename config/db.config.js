// module.exports = {
//   HOST: process.env.DB_HOST,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database:process.env.DB_DATABASE,
//   dialect: process.env.DB_DIALECT,
//   port: process.env.DB_PORT,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
//   timezone: "+00:00",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };

module.exports = {
  host:"localhost",
  username:"postgres",
  password:"music#$321",
  database:"e-store",
  dialect:"postgres",
  timezone:"+05:30",
  pool:{
      max:65000,
      min:0,
      acquire:60000,
      idle:100000
  }
}
