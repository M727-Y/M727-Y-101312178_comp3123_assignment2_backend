const mongoose = require("mongoose")
const employee = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String

})
module.exports = mongoose.model("employee", employee)