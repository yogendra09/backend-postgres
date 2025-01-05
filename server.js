import http from "http";
import app from "./app.js";
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
import intializeSocket from "./socket.js";
intializeSocket(server);



server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})