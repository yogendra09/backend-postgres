import http from "http";
const server = http.createServer();
const PORT = process.env.PORT || 3000;




server.listen(3000,()=>{
    console.log(`server running on port ${PORT}`);
})