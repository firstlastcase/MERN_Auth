import asyncHandler from 'express-async-handler'
import Campaign from "../models/campaignModel.js"
import User from "../models/userModel.js"
import Account from "../models/accountModel.js"
// import axios from 'axios'



// @description     Add a new contactList 
// route            POST /api/contactist
// @access          Private
const createCampaign = asyncHandler(async (req, res)=>{

    try {
        const {name,purpose,contactList}  = req.body;
        const user = await User.findById(req.user.id);

        const account = await Account.findById(user.account);
        console.log('req.body:' + JSON.stringify(req.body));

        if (!account) {
            res.status(400).json({ error: 'cant create a campaign for a user without a valid acccount' });
            return;
        }

        const campaignExists = await Campaign.findOne({ account, name });

        if (campaignExists) {
            res.status(400).json({ error: 'A Campaign with the exact same name already exists in your Account, try again with a different name!!' });
            return;
        }

        
        const campaignsCount = await Campaign.countDocuments({ account },{maxTimeMS:100});
        if(typeof campaignsCount === 'undefined') {
            res.status(404).json({error: 'getting contact list count took a lot of time!'})
            return;
            }

        // console.log(contactList)

        const campaign = await Campaign.create({name,number:campaignsCount+5000,purpose,account:account._id, status:0,createdBy:user.id, contactList});


        if (campaign) {
            res.status(201).json({
                _id:campaign._id,
                name:campaign.name,
                number: campaign.number,
                purpose:campaign.purpose,
                account:campaign.account,
                status:campaign.status,
                contactList:campaign.contactList,
                createdBy:campaign.createdBy
            });
        } else {
            res.status(400).json({ error: 'Invalid campaign data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }

})




// @description     Add a new campaign by the user
// route            POST /api/campaign
// @access          Private
const addCampaign = asyncHandler(async (req, res)=>{
    //  campaign:{name,purpose,status,account,created_by} 
    const {name,purpose,accountNumber,contactList} = req.body
    const user = await User.findById(req.user.id)

    const account = await Account.findOne({number:accountNumber})
    if(!account){
        res.status(400)
        throw new Error('You need to provide a valid Account number')
    }

    if(JSON.stringify(user.account)!== JSON.stringify(account._id)){
        res.status(401)
        throw new Error('Not Authorised')
    }

    const campaignExists = await Campaign.findOne({account:account._id,name})
    if (campaignExists){
        res.status(400)
        throw new Error('A campaign with the exact same name already exists in your Account, try again with a different name!!')
    }


    const campaign = await Campaign.create({name,purpose,account:account._id, status:0,createdBy:user.id, contactList});

    if (campaign){
        res.status(201).json({
            _id:campaign._id,
            name:campaign.name,
            account:campaign.account,
            contactList:campaign.contactList,
            status:campaign.status
        })
    }else{
        res.status(400);
        throw new Error('Invalid campaign data')
    }

})


// @description     Delete campaign 
// route            delete /api/campaign/:id
// @access          Private
const deleteCampaign = asyncHandler(async (req, res)=>{


    const user = await User.findById(req.user.id)
    const campaign = await Campaign.findById(req.params.id)

    const account = await Account.findById(campaign.account._id)
    if(!account){
        res.status(400)
        throw new Error('campaign does not belong to a Valid Account number')
    }
    const accountId = account._id
    if(JSON.stringify(user.account)!== JSON.stringify(accountId)){
        res.status(401)
        throw new Error('Not Authorised')
    }


    if(!campaign){
        res.status(400)
        throw new Error('campaign not found')    
    }

    await Campaign.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
  
    // res.status(200).json({message:'this is just a placeholder message!! - Campaign deleted successfully'})
})


// @description     Get campaigns by account
// route            Get /api/campaign
// @access          Private
const fetchCampaigns = asyncHandler(async (req, res)=>{

    if(!req.params){
        res.status(400)
        throw new Error('account is required')
    }
    const user = await User.findById(req.user.id)
    if(user.account.toString()!== req.params.id){
        res.status(401)
        throw new Error('Not Authorised. Is your user profile associated with a valid account?')
    }

    const campaigns = await Campaign.find({account: req.params.id})
    if (campaigns.length === 0){
        res.status(400)
        throw new Error('No campaigns found for this account')
    }
    res.status(200).json(campaigns)

})



// @description     run campaign for outbound dialing
// route            Post /api/campaign/:id
// @access          Private
const runCampaign = asyncHandler(async (req, res)=>{

    // TBC  TBC TBC  TBC  TBC  TBC  TBC  TBC  TBC

    const campaign = await Campaign.findById(req.params.id)

    if (!campaign){
        res.status(400)
        throw new Error('campaign not found')
    }

    // step 1- find all contacts associated with this campaign
    // step 2- 

    // console.log(JSON.stringify(campaign))

   
})




// @description     Update campaign
// route            Put /api/campaign/:id
// @access          Private
const updateCampaign = asyncHandler(async (req, res)=>{
        //TBC  TBC  TBC TBC TBC  TBC  TBC  TBC  TBC  TBC

    const campaign = await Campaign.findById(req.params.id)
    // const campaign = await Campaign.findById(req.campaign._id)

    if (campaign){
        campaign.name = req.body.name || campaign.name
        campaign.phoneNumber = req.body.phoneNumber || campaign.phoneNumber;

        const updatedCampaign = await campaign.save();

        res.status(200).json({
            _id: updatedCampaign._id,
            name:updatedCampaign.name,
            phoneNumber: updatedCampaign.phoneNumber,
            status: updatedCampaign.status||0
        })
    }else {
        res.status(404)
        throw new Error('Campaign not found')
    }
    // res.status(200).json({message:'Update Campaign Profile'})
})

export { runCampaign, fetchCampaigns, updateCampaign, createCampaign, addCampaign, deleteCampaign}