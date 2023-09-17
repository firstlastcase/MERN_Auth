import { apiSlice } from "./apiSlice";

const ACCOUNT_URL = '/api/account';


export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAccount: builder.query({
            query:(data)=>({
                url:`${ACCOUNT_URL}/${data}`,
                method:'GET'
                // params:data
            })
        })
            })
})

export const {useGetAccountQuery} = accountApiSlice;
        // logout: builder.mutation({
        //     query:(data)=>({
        //         url:`${ACCOUNT_URL}/logout`,
        //         method:'POST'
        //     })
        // }),
        // register: builder.mutation({
        // query:(data)=>({
        //     url:`${ACCOUNT_URL}`,
        //     method:'POST',
        //     body:data
        // })
        // }),
        // updateAccount: builder.mutation({
        // query:(data)=>({
        //     url:`${ACCOUNT_URL}`,
        //     method:'PUT',
        //     params:{id:data.id},
        //     body:data
        // })
        // })
//     })
// })

// export const {useGetAccountQuery} = accountApiSlice;