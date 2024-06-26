const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("./auth.js");
const PORT =  process.env.PORT;
app.use(bodyParser.json());

// Mongo Db Connection
const mongoURL = "mongodb://127.0.0.1:27017/myResto";
// const mongoURL = process.env.DB_URL;
main().
then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log("Error");
})

async function main(){
    await mongoose.connect(mongoURL);
}

// Middleware Function
const logResuest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}

app.use(logResuest);

// Intialize Local Passport
app.use(passport.initialize());
const localPass = passport.authenticate("local", {session: false});

// Home Page 
app.get("/", (req,res)=>{
    res.send("Welcome to our Hotel")
})

// Routing
const personRoutes = require('./routes/personRoute.js');
const menuRoute = require('./routes/menuRoute.js');
app.use('/person', personRoutes);
app.use('/menu', menuRoute);


app.listen(PORT, ()=>{
    console.log("Server is listing on Port", PORT);
})