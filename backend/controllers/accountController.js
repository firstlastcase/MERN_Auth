import asyncHandler from 'express-async-handler'
import Account from "../models/accountModel.js"
import User from "../models/userModel.js"
import axios from 'axios'

// @description     Add a new account 
// route            POST /api/account
// @access          Private
const createAccount = asyncHandler(async (req, res)=>{
    //  account:{name,number,status} 
    const {name,number,status} = req.body

    const accountExists = await Account.findOne({number})
    if (accountExists){
        res.status(400)
        throw new Error('A account with the exact same number already exists!')
    }

    const account = await Account.create({name,number, status:status||0});

    if (account){
        res.status(201).json({
            _id:account._id,
            name:account.name,
            number:account.number,
            status:account.status
        })
    }else{
        res.status(400);
        throw new Error('Invalid account data')
    }

})

// @description     Get account
// route            Get /api/account?query
// @access          Private
const getAccount = asyncHandler(async (req, res)=>{
    
    const account = await Account.findOne(req.query)
    const user = await User.findById(req.user.id)
    if(!account){
        res.status(400)
        throw new Error('account not found')
    }else if(user.role.toString()===process.env.SA_ROLE ||account._id.toString()===user.account.toString()){

        res.status(200).json(account)

    }else{
    // console.log(`get account for account: ${req.params.id}`)
        res.status(401)
        throw new Error('Not Authorised')         
    }
})

// @description     Fetch accounts
// route            Get /api/account
// @access          Private
const fetchAccounts = asyncHandler(async (req, res)=>{


    const accounts = await Account.find({})
    if(accounts.length === 0){
        res.status(400)
        throw new Error('No accounts were found')
    }
    // console.log(`fetching accounts for account: ${req.params.account}`)
    res.status(200).json(accounts)

})

// @description     Delete account 
// route            delete /api/account/:id
// @access          Private
const deleteAccount = asyncHandler(async (req, res)=>{

    const account = await Account.findById(req.params.id)
    if(!account){
        res.status(400)
        throw new Error('account not found')
    }

    // const user = await User.findById(req.user.id)

    // if(!user){
    //     res.status(404)
    //     throw new Error('could not find user')
    // }

    // if(user.role!== parseInt(process.env.SA_ROLE)){
    //     res.status(401)
    //     throw new Error('Not Authorised')
    // }

// how can we check if there are users associated with this account before deleting it?      

    await Account.findByIdAndRemove(req.params.id)
    res.status(200).json({id:req.params.id})
  
    // res.status(200).json({message:'this is just a placeholder message!! - Account deleted successfully'})
})




// @description     Update account
// route            Put /api/account/:id
// @access          Private
const updateAccount = asyncHandler(async (req, res)=>{

    const accountToUpdate = await Account.findById(req.params.id)


    if (accountToUpdate){
        
        accountToUpdate.name = req.body.name || accountToUpdate.name
        accountToUpdate.number = req.body.number || accountToUpdate.number;
        accountToUpdate.status = req.body.status || accountToUpdate.status;

    try{
            const updatedAccount = await accountToUpdate.save();
            res.status(200).json({
            _id: updatedAccount._id,
            name:updatedAccount.name,
            number:updatedAccount.number,
            status: updatedAccount.status
        })
    }catch{
        res.status(400)
        throw new Error('Invalid account data. Account not updated!')
    }


    }else {
        res.status(404)
        throw new Error('Account not found')
    }
    // res.status(200).json({message:'Update Account Profile'})
})

// export { runAccount, getAccounts, updateAccount, addNewAccount, deleteAccount}
export { createAccount, getAccount,fetchAccounts,updateAccount,deleteAccount}