import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// the baseUrl is an empty string because we are using a proxy
const baseQuery = fetchBaseQuery({ baseUrl:''});

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User','Contact','Account'], // ?? i added Contact here
    endpoints:(builder)=>({})
})