import { apiSlice } from "./apiSlice";

const ACCOUNT_URL = '/api/account';


export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAccount: builder.query({
            query:(data)=>({
                // url:`${ACCOUNT_URL}/${data}`,
                url:`${ACCOUNT_URL}`,
                method:'GET',
                params:data
            })
        }),
        addAccount: builder.mutation({
        invalidatesTags:['Account'],
        query:(data)=>({
            url:`${ACCOUNT_URL}/new`,
            method:'POST',
            body:data
        })
        }),
        updateAccount: builder.mutation({
        invalidatesTags:['Account'],
        query:(data)=>({
            url:`${ACCOUNT_URL}/${data._id}`,
            method:'PUT',
            body:data
        })
        }),
        fetchAccounts: builder.query({
        providesTags:['Account'],
        query:()=>({
            url:`${ACCOUNT_URL}/list`,
            method:'GET'
        })
        }),
        deleteAccount: builder.mutation({
        invalidatesTags:['Account'],
        query:(data)=>({
            url:`${ACCOUNT_URL}/${data}`,
            method:'DELETE'
        })
        })
    })
})

export const {
    useGetAccountQuery,
    useUpdateAccountMutation, 
    useFetchAccountsQuery,
    useDeleteAccountMutation,
    useAddAccountMutation} = accountApiSlice;
