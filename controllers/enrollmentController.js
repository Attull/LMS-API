const Course = require("../models/Course")
const Enrollment = require("../models/Enrollment")

const enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        const existingEnrollment = await Enrollment.findOne({
            student: req.user._id,
            course: course._id
        })

        if (existingEnrollment) {
            return res.status(409).json({
                message: "You are already enrolled in this course"
            })
        }

        const enrollment = await Enrollment.create({
            student: req.user._id,
            course: course._id
        })

        return res.status(201).json({
            message: "Enrollment successful",
            enrollment
        })
    } catch (error) {
        // The compound unique index also protects against concurrent requests.
        if (error.code === 11000) {
            return res.status(409).json({
                message: "You are already enrolled in this course"
            })
        }

        return res.status(500).json({
            message: "Unable to enroll in course"
        })
    }
}

const getMyCourses = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.user._id,
            status: "active"
        })
            .sort({ enrolledAt: -1 })
            .populate("course")

        const courses = enrollments
            .map((enrollment) => enrollment.course)
            .filter(Boolean)

        return res.status(200).json({ courses })
    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch enrolled courses"
        })
    }
}

module.exports = {
    enrollInCourse,
    getMyCourses
}
