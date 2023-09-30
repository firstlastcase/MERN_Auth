import { apiSlice } from "./apiSlice";

const CAMPAIGN_URL = '/api/campaign';


export const campaignApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        fetchCampaigns: builder.query({
            query:(data)=>({
                url:`${CAMPAIGN_URL}/${data}`, //data is the account id
                method:'GET'
            })
        }),
        addCampaign: builder.mutation({
        invalidatesTags:['Campaign'],
        query:(data)=>({
            url:`${CAMPAIGN_URL}/new`,
            method:'POST',
            body:data
        })
        }),
        updateCampaign: builder.mutation({
        invalidatesTags:['Campaign'],
        query:(data)=>({
            url:`${CAMPAIGN_URL}/${data._id}`,
            method:'PUT',
            body:data
        })
        }),
        deleteCampaign: builder.mutation({
        invalidatesTags:['Campaign'],
        query:(data)=>({
            url:`${CAMPAIGN_URL}/${data}`,
            method:'DELETE'
        })
        })
    })
})

export const {useFetchCampaignsQuery, useAddCampaignMutation} = campaignApiSlice;