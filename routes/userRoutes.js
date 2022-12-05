const express = require("express")
const UserModel = require("../models/user")
const {registerUser, loginUser, getUser} = require('../Controllers/userController')

const routes = express.Router()
const {protect} = require('../middleware/authMiddleware')

routes.post("/user/register", registerUser)
routes.post("/user/login", loginUser)
routes.get("/user/get",protect, getUser)

module.exports = routes