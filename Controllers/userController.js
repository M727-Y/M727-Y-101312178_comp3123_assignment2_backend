const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const userModel = require('../models/user')
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please fill the data')
    }

    if( await userModel.findOne({email})){
        res.status(400)
        throw new Error('The email is taken')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(200).json({
            _id: user.id,
            name :  user.name,
            email : user.email,
            token:generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Bad Request')
    }
    //res.json(name)

    // res.json({message:'register user'})
})
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id)
        })
    } else{
        res.status(400)
        throw new Error("Invalid email or password")
    }
    
})
const getUser =asyncHandler(async(req,res) => {
    res.status(200).json(req.user)
})

const secret = "secret"
const generateToken = (id) =>{
    return jwt.sign({id},`${process.env.JWT_SECRET}`,{
        expiresIn:'5d'
    })
}
module.exports = {
    registerUser,
    loginUser,
    getUser
}