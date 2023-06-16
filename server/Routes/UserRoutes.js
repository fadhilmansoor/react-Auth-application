const express=require("express")
const user_Rout=express.Router()
const userController = require('../Controllers/UserController')
const { uploadOptions } = require('../Multer')

user_Rout.post('/register',userController.UserReg)
user_Rout.post('/login',userController.UserLogin)
user_Rout.post("/uploadimg",uploadOptions.single('image'),userController.UpdateImg)


module.exports=user_Rout;

