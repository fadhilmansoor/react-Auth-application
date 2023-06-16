import { useRevalidator } from 'react-router-dom';
import {adminApi} from '../Utils/Api'


export async function Adminlogin(details){
    try {
      const response = await adminApi.post("/login",details)
      return response
    } catch (error) {
        console.log(error);
    }
}


export async function getUsers(){
  try {
     const data = await adminApi.get('/getalluser')
     return data
  } catch (error) {
    
  }
}

export async function deleteUser(userId){
  try{
    const data = await adminApi.post('/deleteuser',{userId})
    return data
  }catch(error){
    console.log(error);
  }
}

export async function deleteEmail(userId){
  try {
     const data =await adminApi.post('/deletemail',userId)
     return data
  } catch (error) {
    console.log(error);
  }
}


export async function newUser(value){
  try {
    const data = await adminApi.post('/adduser',value)
    return data
  } catch (error) {
    
  }
}

export async function findUser (userId) {
  try {
    const data = await adminApi.get(`/userdetail/${userId}`)
    return data
  } catch (error) {
    console.log(error);
  }
};


export async function updateName(id,email){
  try { 
    console.log(id,email);
    const data = await adminApi.post('/editname',{id,email})
    return data
  } catch (error) {
    console.log(error);
  }
}

