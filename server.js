const http = require('http');
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const app = require('./src/app.js');
const server = http.createServer(app);
const myglobal = require("./config/db.global.js");
const { db } = require("./database/index.js")();


const port = process.env.PORT || 3001;



Promise.all(
  [
    db.sequelize.sync()
  ]
).then(() => {
  // Attach databases to the global object
  myglobal.db = db;

  // Start the server after databases are synchronized  
  server.listen(port, () => {
    console.log(`Server connected with port ${port}`);
  });
}).catch(error => {
  console.error('Failed to sync databases:', error);
});

