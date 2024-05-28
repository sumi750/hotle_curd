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

personSchema.pre('save', async(next)=>{
    const person = this;
    // Hash the password only if it has been modified(or is new)
    if(!person.isModified("password")) return next();
    
    try{
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword =  async (candidatePassword) =>{
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