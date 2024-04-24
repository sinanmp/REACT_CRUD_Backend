const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var schema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    age:Number,
    password:String,
    imageUrl:String
});

const userDb = mongoose.model("userdb", schema);

module.exports = userDb;
