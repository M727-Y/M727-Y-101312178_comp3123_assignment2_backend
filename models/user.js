const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:[true,"please Add an Email"],
        unique: true
    },
    name:{
        type:String,
        require:[true,"please Add your Name"]
    },
    password:{
        type:String,
        require:[true,"please Add a password"]
    }
})
module.exports = mongoose.model("user", userSchema)