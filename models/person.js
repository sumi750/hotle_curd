const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Person's Schema
const personSchema = new Schema({
    name: {
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
    }
})

const Person = mongoose.model("Person", personSchema);
module.exports = Person;