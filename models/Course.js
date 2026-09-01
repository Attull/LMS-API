const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a course title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a course description'],
        trim: true
    },
    instructer: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        trim: true
    },
    level: {
        type: String,
        required: [true, 'Please specify the course level'],
        enum: {
            values: ['beginner', 'intermediate', 'advanced'],
            message: 'Level must be beginner, intermediate, or advanced'
        }
    },
    price: {
        type: Number,
        required: [true, 'Please specify the price'],
        min: [0, 'Price cannot be negative']
    },
    duration: {
        type: String,
        required: [true, 'Please specify total course duration in hours'],
        min: [0.1, 'Duration must be greater than zero']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Course = mongoose.model("course", courseSchema)

module.exports = Course