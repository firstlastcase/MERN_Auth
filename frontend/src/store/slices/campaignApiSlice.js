import { apiSlice } from "./apiSlice";

const CAMPAIGN_URL = '/api/campaign';


export const campaignApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getCampaigns: builder.query({
            query:(data)=>({
                url:`${CAMPAIGN_URL}/${data}`, //data is the account id
                method:'GET'
                // body:data //data is something like this {account:account_id}
            })
        })
            })
})

export const {useGetCampaignsQuery} = campaignApiSlice;
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

// export const {} = campaignApiSlice;