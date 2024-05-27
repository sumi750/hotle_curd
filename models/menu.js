const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    size:{
        type: String,
        enum : ["small", "large", "medium", "none"],
        required: true
    },
    info:{
        type:String,
        required: true
    }
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;