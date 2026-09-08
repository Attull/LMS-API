const mongoose = require("mongoose")

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "An enrollment must have a student"]
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: [true, "An enrollment must have a course"]
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active"
    }
}, {
    timestamps: true
})

// A student can have only one enrollment for a particular course.
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true })

module.exports = mongoose.model("Enrollment", enrollmentSchema)
