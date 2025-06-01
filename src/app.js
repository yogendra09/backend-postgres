const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const router = require("./routes/router.js");
const { generatedErrors } = require("./middlewares/errors.js");
dotenv.config();
const app = express();


app.use(cors({ origin: true, credentials: true }));




// body parser
app.use(express.json());
app.use(express.urlencoded({ extended:false }));



app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET || "defaultSecret",
    resave: false,                 
    saveUninitialized: false,      
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      httpOnly: true,          
      maxAge: 8000 * 60 * 60,  
    },
  })
);
app.use(cookieparser());


app.get("/",function(req,res,next){
    res.json({
        Success:"welcome to home"
    })
})
app.use("/api/v1",router);


//error handling

app.use((req,res,next)=>{
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`),404);
});
app.use(generatedErrors);

module.exports =  app;

