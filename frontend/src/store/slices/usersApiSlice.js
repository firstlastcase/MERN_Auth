import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:'POST',
                body:data
            })
        }),
        logout: builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/logout`,
                method:'POST'
            })
        }),
        register: builder.mutation({
        invalidatesTags:['User'],
        query:(data)=>({
            url:`${USERS_URL}/new`,
            method:'POST',
            body:data
        })
        }),
        updateUser: builder.mutation({
        invalidatesTags:['User'],
        query:(data)=>({
            url:`${USERS_URL}/profile`,
            method:'PUT',
            body:data
        })
        }),
        updateUserRole: builder.mutation({
        invalidatesTags:['User'],
        query:(data)=>({
            url:`${USERS_URL}/role/${data._id}`,
            method:'PUT',
            body:data
        })
        }),
        fetchUsers: builder.query({
        providesTags:['User'],
        query:()=>({
            url:`${USERS_URL}/list`,
            method:'GET'
        })
        }),
        deleteUser: builder.mutation({
        invalidatesTags:['User'],
        query:(data)=>({
            url:`${USERS_URL}/del/${data}`,
            method:'DELETE'
        })
        })
    })
})

export const {
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useUpdateUserMutation, 
    useUpdateUserRoleMutation, 
    useFetchUsersQuery, 
    useDeleteUserMutation} = usersApiSlice;