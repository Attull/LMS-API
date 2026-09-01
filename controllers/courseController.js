const Course = require("../models/Course")

const createCourse =  async (req,res) => {
    try {
        const {title , description, instructor, category, level, price, duration} = req.body

        if(!title, !description, !instructor, !category, !level, !price, !duration){
            return res.status(400).send({
                message : "Bad Request"
            })            
        }

        const existingCourse = await Course.findOne({title : title})
        
        if(existingCourse){
            return res.status(400).send({
                message : "Bad Request, Course already Exists"
            })
        }

        const course = await Course({
            title : title,
            description : description,
            instructor : instructor,
            category : category,
            level : level,
            price : price,
            duration : duration
        })

        await course.save()

        return res.status(200).send({
            message : "New course created"
        })


    }catch(error){
        next()
    }
}


const getCourses = async (req,res) => {
    try {
        const {id} = req.params

        const courses = await Course.find()

        return res.status(200).send(courses)

    }catch(error){
        next()
    }
} 


const getCourseById = async (req,res) => {
    try {
        const {id} = req.params

        const course = await Course.findById(id)

        if(!course){
            return res.status(400).send({
                message : "Bad Request: Course not found"
            })
        }

        return res.status(200).send(course)

    }catch(error){
        next()
    }
} 


const updateCourse = async (req,res) => {
    try{
        const{id} = req.params

        const course = await Course.findByIdAndUpdate(id, req.body)

        if(!course){
            return res.status(400).send({
                message : "Bad Request: Course not found"
            })
        }

        return res.status(200).send({
            message : "Course Updated"
        })

    }catch(error){
        next()
    }
} 


const deleteCourse = async (req,res) =>{
    try{
        const {id} = req.params

        const course = Course.findByIdAndDelete(id)

        if(!course){
            return res.status(400).send({
                message : "Bad Request: Course not found"
            })
        }

        return res.status(200).send({
            messgae : "course deleted"
        })

    }catch(error){
        next()
    }
}

module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
}