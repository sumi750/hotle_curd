const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Person's Schema 
const personSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work:{
        type: String,
        enum : ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username: {
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
})

// Encrypt Password before saving into database

personSchema.pre('save', async function(next){
    // Hash the password only if it has been modified(or is new)
    if(!this.isModified("password")) return next();
    
    try{
        const salted = 10;
        const salt = await bcrypt.genSalt(salted);

        // Hash password
        const hashedPassword = await bcrypt.hash( this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{

        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch; 
    }
    catch(err){
        throw err;
    }
}

const Person = mongoose.model("Person", personSchema);
module.exports = Person;