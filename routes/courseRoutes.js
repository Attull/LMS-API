const express = require("express")
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require("../controllers/courseController")
const { protect } = require("../middleware/authMiddleware")

const courseRoutes = express.Router()

courseRoutes.route("/")
.post(protect, createCourse)
.get(getCourses)

courseRoutes.route("/:id")
.get(getCourseById)
.put(protect, updateCourse)
.delete(protect, deleteCourse)

module.exports = courseRoutes