const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "others"] },
    about: { type: String }
})

const connections = new mongoose.Schema({
    
})

module .exports = mongoose.model("User", userSchema);