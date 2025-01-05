import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./routes/user.routes.js";
const app = express();


import cors  from "cors";
app.use(cors({ origin: true, credentials: true }));


// db connection
import {connectDB}  from "./config/db.config.js";
connectDB();

// logger
import logger  from 'morgan';
app.use(logger("tiny"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended:false }));


import session from "express-session";
import cookieparser from "cookie-parser";
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET, // Replace with a strong, unique secret
    resave: false,                 // Don't save the session if unmodified
    saveUninitialized: false,      // Don't create a session until something is stored
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true,          // Prevent client-side access to the cookie
      maxAge: 8000 * 60 * 60,  // 1-hour expiry (adjust as needed)
    },
  })
);
app.use(cookieparser());


app.get("/",function(req,res,next){
    res.json({
        Success:"welcome to home"
    })
})
app.use("/api/user",userRoutes);


//error handling 
import ErrorHandler  from "./utils/ErrorHandler.js";
import { generatedErrors } from './middlewares/errors.js';

app.all("*",(req,res,next)=>{
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`),404);
});
app.use(generatedErrors);

export default app;

