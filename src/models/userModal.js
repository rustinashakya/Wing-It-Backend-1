const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
    },
    address: {
        permanentAddress: String,
        delevaryAddress: String
    },
    gender: String,
    imageUrl: String,
    phoneNumber: String,
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    isVerified: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})



module.exports = mongoose.model("User", userSchema)