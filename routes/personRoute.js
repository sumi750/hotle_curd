const express = require("express");
const router = express.Router();
const Person = require("./../models/person.js");
const  {jwtAuth, generateToken} = require("./../models/jwt.js");

// Post Route to add person
router.post("/signup",  async (req,res)=>{

    try{
        const data = req.body;
        const newPerson = new Person(data);
        const savedPerson =  await newPerson.save();
        console.log(savedPerson);
        
        // Payload for data 
        const payload = {
            id: savedPerson.id,
            username: savedPerson.username
        }

        // Genretaing a Token
        const token = generateToken(payload);
        console.log("Token is :", token);
        res.json({response: savedPerson, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json(error, "Internal server error");
    }
});

// Login Router
router.post("/login", async(req,res)=>{

    try{
        const {username, password} = req.body;

        const user = await Person.findOne({username: username});

        if(!user || !(await user.comparePassword(password) != undefined)){
            return res.status(401).json({error: "Ivalid Username or Password"});
        }

        // Genearte Tokens
        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload)
        res.json({token});

    }
    catch(err){
        console.log(err);
        res.status(500).json(error, "Internal server error");
    }
})

// Profile Route
router.get("/profile", jwtAuth, async(req,res)=>{

    try{
        const userData = req.user;
        console.log(userData)
        const userId = userData.id;
        console.log(userId);
        const userr = await Person.findById(userId);
        console.log(userr);
        res.json(userr);
    }
    catch(err){
        console.log("Error Accured");
        res.status(500).send(err);

    }

})

//Get method to get the person
router.get("/", jwtAuth, async (req,res)=>{
    try{
        const data = await Person.find({});
        console.log("Data fetched");
        res.json(data);
    }
    catch(err){
        console.log("Error Accured");
        res.status(500).send(err);
    }
})

// Method to get the work Type of Person
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

// Delete Route
router.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id;   // Extract the id from URL parameter
        // const updatePerson = req.body;
        const deletePerson = await Person.findByIdAndDelete(id);
        res.send("Data Deleetd");
        console.log(deletePerson);

    }
    catch(err){
        console.log("Error Accured");
        res.send(500).send(err);
    }
})

module.exports = router;