import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    id: "",
    email: "",
    image: "",
  
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.image = action.payload.image;
          } ,

          LogoutDetails: (state, action) => {
            state.id ="";
            state.email = "";
            state.image = "";
          }   
    }
})

export const { setUserDetails ,LogoutDetails} = userSlice.actions;
export default userSlice.reducer;