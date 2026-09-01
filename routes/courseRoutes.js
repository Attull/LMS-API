const express = require("express")
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require("../controllers/courseController")

const courseRoutes = express.Router()

courseRoutes.route("/api/courses")
.post(createCourse)
.get(getCourses)

courseRoutes.route("/api/courses/:id")
.get(getCourseById)
.put(updateCourse)
.delete(deleteCourse)

module.exports = courseRoutes