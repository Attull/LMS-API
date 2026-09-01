import mongoose from "mongoose"

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,"name is required"]
    },
        email: {
        type: String,
        required: [true,"email is required"]
    },
        password: {
        type: String,
        required: [true, "password is required"]
    },
        role: {
        type: String,
        required: [true,"role is required"]
    },
        createat: {
        type: Date,
        default: Date.now
    },
})
export default mongoose.model("User",userSchema)
