const adminData=require("../Modals/AdminModel")
const userModal = require('../Modals/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const exists = await adminData.findOne({email:email})

        if(exists){
            if(password === exists.password){
                
             const token = jwt.sign({adminId:exists._id}, process.env.JwtSecretKey, { expiresIn: '1m' })
             return res.status(200).json({token:token,admin:exists, message:"logged in",status:true})
             }else{
             return res.status(200).json({alert:"password is wrong",status:false})
             }
        }else{
            return res.status(201).json({alert:"No Account in this email",status:false})
        }

    } catch (error) {
        
    }
}

const userdata = async(req,res)=>{
    try {
        const data = await userModal.find({})
        if(data){
            res.status(200).json({status:true,data:data})
        }else{
            res.status(200).json({status:false,data:data})

        }
    } catch (error) {
        
    }
}

const deleteUser = async(req,res)=>{
    try {
        userId = req.body.userId;
        console.log(userId);
        const deleted = await userModal.deleteOne({_id:userId})
        if(deleted){
            console.log(deleted);
            res.status(200).json({deleted:true})
        }else{
          res.status(200).json({deleted:false})

        }
        
    } catch (error) {
        console.log(error);
    }
}

const AddUser = async(req,res)=>{
    try {
     const{email,password}=req.body
      const exists = await userModal.findOne({email:email})
      if(exists){
        console.log('exists');
        res.status(200).json({alert:"This email already exists", status:false})
      }else{
        const hash =await bcrypt.hash(password,10)
        const newuser = await userModal.create({email:email,password:hash})
        if(newuser){
            res.status(200).json({status:true,message:"user created"})
        }else{
            res.status(201).json({status:false,alert:"something went wrong"})
        }
      }
    } catch (error) {
        console.log(error);
    }
}


const getuser = async(req,res)=>{
    try {
        const id = req.params.id
        const userData = await userModal.findOne({_id:id})
        if(userData){
            res.status(200).json({user:userData, status:true,message:"find user"})
        }else{
            res.status(201).json({status:false,alert:"something went wrong"})
        }

    } catch (error) {
        console.log(error);
    }
}



const updatename = async(req,res,next)=>{
    try{
     const {id,email}= req.body
     
     const update = await userModal.findOneAndUpdate({_id:id},{$set:{email:email}},{new:true}).then((response)=>{
       res.json({updated:true,data:response})
     })   
    }catch(err){
     console.log(err)
    }
  }

module.exports={
    login,
    userdata,
    deleteUser,
    AddUser,
    getuser,
    updatename
}