import { apiSlice } from "./apiSlice";

const CONTACT_URL = '/api/contact';


export const contactApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addContact: builder.mutation({
            query:(data)=>({
                url:`${CONTACT_URL}`,
                method:'POST',
                body:data  // body is {name:string, phoneNumber:string}
            })
        }),
        fetchContact: builder.query({
            query:(data)=>({
                url:`${CONTACT_URL}`,
                method:'GET',
                params:{id:data}
            })
        }),
        register: builder.mutation({
        query:(data)=>({
            url:`${CONTACT_URL}`,
            method:'POST',
            body:data
        })
        }),
        updateUser: builder.mutation({
        query:(data)=>({
            url:`${CONTACT_URL}/profile`,
            method:'PUT',
            body:data
        })
        })
    })
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation} = usersApiSlice;