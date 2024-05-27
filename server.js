const express = require("express");
const app = express();
let port = 5050;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// Mongo COnnection
const mongoURL = "mongodb://127.0.0.1:27017/myResto";
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

// Home Page 
app.get("/", (req,res)=>{
    res.send("Welcome to our Hotel")
})

// Routing
const personRoutes = require('./routes/personRoute.js');
app.use('/person',personRoutes);

const menuRoute = require('./routes/menuRoute.js');
app.use('/menu', menuRoute);


app.listen(port, ()=>{
    console.log("Server is listing on Port", port);
})