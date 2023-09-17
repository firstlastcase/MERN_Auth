import {createSlice} from '@reduxjs/toolkit'
// import toast from 'react-toastify'

const initialState = {
    campaignslist: localStorage.getItem('campaignslist')? JSON.parse(localStorage.getItem('campaignslist')): [{name:'Sample Campaign Name', status:'never started'}]
    
}

const campaignSlice = createSlice({
    name:'campaign',
    initialState,
    reducers: {
        setCampaigns:(state,action)=>{
            // action will be 
            state.campaignslist = action.payload;
            try{
            localStorage.setItem('campaignslist', JSON.stringify(action.payload))
            }catch(err){
                // toast.error('Something went wrong, please')
                console.log(err)
            }
        }


    }

})

export const {setCampaign} = campaignSlice.actions;
export default campaignSlice.reducer