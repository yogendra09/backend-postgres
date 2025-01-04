require("dotenv").config();
import express from "express"

const app = express();


import cors  from "cors"
app.use(cors({ origin: true, credentials: true }));


// db connection
import("./config/db.config").connectDatabase();

// logger
import logger  from 'morgan'
app.use(logger("tiny"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended:false }));


const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
  resave:true,
  saveUninitialized:true,
  cookie:{maxAge:1000*60*60*2},
})) 
app.use(cookieparser());


app.get("/",function(req,res,next){
    res.json({
        Success:"welcome to home"
    })
})
app.use("/api",require("./routes/userRoutes"));


//error handling 
import ErrorHandler  from "./utils/ErrorHandler"
import { generatedErrors } from './middlewares/errors'

app.all("*",(req,res,next)=>{
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`),404);
});
app.use(generatedErrors);

app.listen(
  process.env.PORT,
  console.log(`server running on port ${process.env.PORT}`)
);
