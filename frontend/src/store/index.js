import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import accountReducer from './slices/accountSlice'
import campaignReducer from './slices/campaignSlice'
import { apiSlice } from './slices/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({

    reducer:{
        auth: authReducer,
        account: accountReducer,
        campaign: campaignReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)

export default store