const express = require("express");
const router = express.Router();
const Menu = require("./../models/menu.js");

// POst method for Menu
router.post("/",  async (req,res)=>{

    try{
        const menuData = req.body;
        const newMenu = new Menu(menuData);
        const savedMenu =  await newMenu.save();
        console.log(savedMenu);
        res.status(200).json(savedMenu);
        res.send("data saved");

    }
    catch(err){
        console.log(err);
        // res.status(500).json(error, "Internal server error");
    }
});

// Get Method for Menu
router.get("/",  async (req,res)=>{
    try{
        const menuData = await Menu.find({});
        console.log("Data fetched");
        res.json(menuData);
    }
    catch(err){
        console.log("Error Accured");
        res.send(500).send(err);
    }
})
module.exports = router
