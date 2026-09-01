const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a user name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: {
            values: ['student', 'instructor', 'admin'],
            message: 'Role must be either student, instructor, or admin'
        },
        default: 'student'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    })


module.exports = mongoose.model("User", userSchema)
