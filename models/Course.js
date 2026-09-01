const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true,
        trim : true
    },
    description : {
        type : String,
        require : true,
        trim : true
    },
        instructer : {
        type : String,
        require : true,
        trim : true
    },
        category : {
        type : String,
        require : true,
        trim : true
    },
        level : {
        type : String,
        require : true,
        trim : true
    },
        price : {
        type : Number,
        require : true,
        min : 1
    },
        duration : {
        type : String,
        require : true,
        min : 1
    },
        createdAt : {
        type : Date,
        default : Date.now
    }
})

const Course = mongoose.model("course", courseSchema)

module.exports = Course