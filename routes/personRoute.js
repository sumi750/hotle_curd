const express = require("express");
const router = express.Router();
const Person = require("./../models/person.js");
const  {jwtAuth, generateToken} = require("./../models/jwt.js");

// POst route to add person
router.post("/signup",  async (req,res)=>{

    try{
        const data = req.body;
        const newPerson = new Person(data);
        const savedPerson =  await newPerson.save();
        console.log(savedPerson);
        
        const token = generateToken(savedPerson.username);
        console.log("Token is :", token);
        res.json({response: savedPerson, token: token});
    }
    catch(err){
        console.log(err);
        // res.status(500).json(error, "Internal server error");
    }
});

//Get method to get the person
router.get("/login",  async (req,res)=>{
    try{
        const data = await Person.find({});
        console.log("Data fetched");
        res.json(data);
    }
    catch(err){
        console.log("Error Accured");
        res.send(500).send(err);
    }
})


//Get Method to get the work Type of Person
router.get("/:worktype", async(req,res)=>{
    try{
        const worktype = req.params.worktype;
        if(worktype == "chef" || worktype == "manager" || worktype == "waiter"){
            const response = await Person.find({work : worktype})
            console.log("data exists");
            res.json(response);
        }
        else{
            res.status(404).json({error: "invaild work type"});
        }

    }
    catch(err){
        console.log("Error Accured");
    res.send(500).send(err);
        
    }
});

// Update Route
router.put('/:id', async(req,res)=>{
    try{
        const id = req.params.id;   // Extract the id from URL parameter
        const updatePerson = req.body;

        const response = await Person.findByIdAndUpdate(id, updatePerson,{
            new: true, // Return the updated document
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error: "Person not found"})
        }

        console.log("Updated succes");
        res.send("Data Updated");
        console.log(response);
    }
    catch(err){
        console.log("Error Accured");
    res.send(500).send(err);
    }
})

// Delete a Route
router.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id;   // Extract the id from URL parameter
        // const updatePerson = req.body;
        const deletePerson = await Person.findByIdAndDelete(id);
        console.log("Deleted Succes")
        res.send("Data Deleetd");
        console.log(deletePerson);

    }
    catch(err){
        console.log("Error Accured");
        res.send(500).send(err);
    }
})

module.exports = router;