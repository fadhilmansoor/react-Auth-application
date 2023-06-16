const UserModel = require('../Modals/UserModel')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const UserReg = async(req,res)=>{
    try {
        console.log("FN : userReg");
        const {email,password} = req.body
        const exists = await UserModel.findOne({email:email})
        if(exists){
            console.log("email already exists");
            return res.status(200).json({alert:"Email already Exists",status:false})
        }else{
            const hash = await bcrypt.hash(password,10)
            const newuser = await UserModel.create({email:email,password:hash})
            const token = jwt.sign({ userId: newuser._id }, process.env.JwtSecretKey, { expiresIn: '1m' });
            return res.status(200).json({ token: token,user:newuser, alert:'Registred', status: true});
        }
    } catch (error) {
        console.log(error);
    }
}


const UserLogin = async(req,res)=>{
    try {
        console.log("FN : userLogin");
        const{email,password}=req.body
        const exists = await UserModel.findOne({email:email})
        if(exists){
            const access = await bcrypt.compare(password,exists.password)
            if(access){
                const token = jwt.sign({ userId: access._id }, process.env.JwtSecretKey, { expiresIn: '1m' });
                return res.status(200).json({ user:exists,token:token, message:"login" ,status:true})
            }else{
                return res.status(404).json({alert:"Password is wrong",status:false})
            }
        }else{
         return res.status(201).json({alert:"No Account in this email",status:false})
        }

        
    } catch (error) {
        
    }
}


const UpdateImg = async(req,res)=>{
    try {
        console.log("FN : UpdateImg");
        const id = req.body.userId
        const img = req.file.filename
        const update = await UserModel.findOneAndUpdate({_id:id},{$set:{image:img}},{new:true}).then((response)=>{
            console.log(response,'response ogthee');
            res.json({updated:true,data:response})
          })  
          console.log("updation");
        console.log(update);
    } catch (error) {
        
    }
}


module.exports={
    UserReg,
    UserLogin,
    UpdateImg
}