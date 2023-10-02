import { apiSlice } from "./apiSlice";

const CONTACTLIST_URL = '/api/contactlist';

// router.post('/', protect, createContactList)
// router.get('/all',protect, fetchContactLists)
// router.route('/one/:id').delete(protect, deleteContactList)         // id is the Contact List ID
//                         .post(protect, addContactsToContactList);


export const contactListApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        fetchContactLists: builder.query({
            query:()=>({
                url:`${CONTACTLIST_URL}/all`, 
                method:'GET'
            })
        }),
        createContactList: builder.mutation({
        invalidatesTags:['ContactList'],
        query:(data)=>({
            url:`${CONTACTLIST_URL}`,
            method:'POST',
            body:data   //         data should be like this: { name : 'some contact list name'}
        })
        }),
        addContactsToContactList: builder.mutation({
        invalidatesTags:['ContactList'],
        query:(id,data)=>({
            url:`${CONTACTLIST_URL}/one/${id}`,
            method:'POST',
            body:data
            })
        }),
    // here is an example of data for the request above! 
    // {
    //     "contacts": [
    //         {
    //             "phoneNumber": "133-333-3333",
    //             "everContacted": true,
    //              "lastContactedDate": "2023-10-01T12:00:00Z"
    //         }
    // }


        deleteContactList: builder.mutation({
        invalidatesTags:['ContactList'],
        query:(id)=>({
            url:`${CONTACTLIST_URL}/one/${id}`,
            method:'DELETE'
        })
        }),
        getContactList: builder.query({
        query:(id)=>({
            url:`${CONTACTLIST_URL}/one/${id}`,
            method:'GET'
        })
        })
    })
})

export const {useFetchContactListsQuery,
            useCreateContactListMutation, 
            useAddContactsToContactListMutation, 
            useDeleteContactListMutation,
            useGetContactListQuery} = contactListApiSlice;