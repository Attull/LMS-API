const express = require("express")
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require("../controllers/courseController")
const { enrollInCourse } = require("../controllers/enrollmentController")
const { protect } = require("../middleware/authMiddleware")

const courseRoutes = express.Router()

courseRoutes.route("/api/courses")
.post(protect, createCourse)
.get(getCourses)

courseRoutes.route("/api/courses/:id")
.get(getCourseById)
.put(protect, updateCourse)
.delete(protect, deleteCourse)

courseRoutes.post("/api/courses/:id/enroll", protect, enrollInCourse)

module.exports = courseRoutes