const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile_no: { type: Number, required: true },
    userName: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    age : {type : Number , required : String},  
    profile: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    lastLogin: { type: Date, default: null , required: false },
    isActive: { type: Boolean, default: true }
})

module.exports = mongoose.model("user", userSchema)



