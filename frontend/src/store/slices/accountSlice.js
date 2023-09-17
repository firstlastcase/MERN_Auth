import {createSlice} from '@reduxjs/toolkit'
// import toast from 'react-toastify'

const initialState = {
    accountInfo: localStorage.getItem('accountInfo')? JSON.parse(localStorage.getItem('accountInfo')): {name:'Sample Account Name', number:123456, status:100}
    
}

const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers: {
        setAccount:(state,action)=>{
            // action will be the user
            state.accountInfo = action.payload;
            try{
            localStorage.setItem('accountInfo', JSON.stringify(action.payload))
            }catch(err){
                // toast.error('Something went wrong, please')
                console.log(err)
            }
        }


    }

})

export const {setAccount} = accountSlice.actions;
export default accountSlice.reducer