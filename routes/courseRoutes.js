const express = require("express")
const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require("../controllers/courseController")

const courseRoutes = express.Router()

courseRoutes("/api/courses")
.post(createCourse)
.get(getCourses)

courseRoutes("/api/courses/:id")
.get(getCourseById)
.put(updateCourse)
.delete(deleteCourse)

// module.exports = courseRoutes