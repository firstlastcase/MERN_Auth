import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredentials:(state,action)=>{
            // action will be the user
            state.userInfo = action.payload;
            try{
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            }catch(err){
                console.log(err)
            }
        },
        logout:(state,action)=>{
            // this slice is to clear the local storage when the user logs out and also to clear the userInfo state
            state.userInfo = null
            localStorage.removeItem('userInfo')
        }


    }

})

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer