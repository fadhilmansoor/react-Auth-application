const express=require("express")
const admin_Rout=express.Router()
const adminController = require('../Controllers/adminController')

admin_Rout.post('/login',adminController.login)
admin_Rout.get('/getalluser',adminController.userdata)
admin_Rout.post('/deleteuser',adminController.deleteUser)
admin_Rout.post('/adduser',adminController.AddUser)
admin_Rout.get('/userdetail/:id',adminController.getuser)
admin_Rout.post('/editname',adminController.updatename)
admin_Rout.post('/editname',adminController.updatename)




module.exports=admin_Rout