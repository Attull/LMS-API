const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    } catch (err) {
        return console.log(err)
    }
    if (existingUser) {
        return res
            .status(400)
            .josn({ message: "User already in use" })
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashedPassword
    })

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({ user });
}

const login = async(req, res, next)=>{
    const {email,password} = req.body
    let existingUser
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res
        .status(404)
        .json({message:"email not found"})
    }
    const token =jwt.sign(existingUser.email, process.env.SECRET_KEY)

    const matchPassword = bcrypt.compareSync(password,existingUser.password)
    if (!matchPassword){
        return res
        .status(400)
        .json({message:"incorrect Password"})
    }
    return res
    .status(200)
    .json({ message: "Login Successfull", user: existingUser })
}

module.exports = {
    login,
    register
}