import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js"
import Account from '../models/accountModel.js'
import generateToken from '../utils/generateToken.js'


// @description     Auth user/set token
// route            POST /api/users/auth
// @access          Public
const authUser = asyncHandler(async (req, res)=>{

    const {email, password} = req.body;

    const user = await User.findOne({email})

     if (user && (await user.matchPassword(password))){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email: user.email,
            role:user.role,
            account:user.account
        })
    }else{
        res.status(401);
        throw new Error(`Invalid email or password`)
    }

})


// @description     Register a new user 
// route            POST /api/users
// @access          Public
const registerUser = asyncHandler(async (req, res)=>{
    // const {name, email, password,role,accountNumber} = req.body
    const {name, email, password,role,account} = req.body
    const userExists = await User.findOne({email})
    if (!account||!name||!email||!password||!role){
        res.status(400)
        throw new Error('Please provide all required details!')
    }
    if (userExists){
        res.status(400)
        throw new Error('User already exists!!')
    }

    // const account = await Account.findOne({number:accountNumber})
    const foundAccount = await Account.findById(account)
    if (foundAccount){

        const user = await User.create({name, email, password,role:role||100,account:foundAccount._id});
        if (user){
        // generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email: user.email,
            role:user.role,
            account:user.account
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data')
    }
    }else{
        res.status(400);
        throw new Error('Invalid account number')}

})


// @description     Logout user 
// route            POST /api/users/logout
// @access          Public
const logoutUser = asyncHandler(async (req, res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({message:'User logged out!'})
})

// @description     Get user profile
// route            Get /api/users/profile
// @access          Private
const getUserProfile = asyncHandler(async (req, res)=>{
    const user = {
        _id:req.user._id,
        name: req.user.name,
        email: req.user.email,
        role:req.user.role,
        account:req.user.account
    }
    res.status(200).json(user)
})
// @description     fetch users
// route            Get /api/users/
// @access          Private
const fetchUsers = asyncHandler(async (req, res)=>{
    const users = await User.find({})
    if(users){
        res.status(200).json(users)
    }else{
        res.status(404)
        throw new Error('could not get users!')
    }
})

// @description     Update user profile
// route            Put /api/users/profile
// @access          Private
const updateUserProfile = asyncHandler(async (req, res)=>{

    const user = await User.findById(req.user._id)

    if (user){

        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password;
        }

        try{
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email: updatedUser.email,
            role:updatedUser.role,
            account:updatedUser.account
        })}
        catch(err){
            res.status(400)
            throw new Error('Could not update user profile.')
        }
    }else {
        res.status(404)
        throw new Error('User not found')
    }

})


// @description     Update user role
// route            Put /api/users/role
// @access          Private
const updateUserRole = asyncHandler(async (req, res)=>{

    const userToUpdate = await User.findById(req.params.id)

    if (userToUpdate){
        
        userToUpdate.name=req.body.name || userToUpdate.name
        userToUpdate.email=req.body.email || userToUpdate.email
        if(req.body.account){
            // const updatedAccount = await Account.findById({_id:req.body.account._id})
            
            // if(updatedAccount){userToUpdate.account=updatedAccount || userToUpdate.account}
            userToUpdate.account=req.body.account || userToUpdate.account
        }else{
                res.status(404)
                throw new Error('Account not found, please enter a valid account number or create a new account!')
            }
        
        if(req.body.role){userToUpdate.role = req.body.role || userToUpdate.role}
        if (req.body.password) {userToUpdate.password = req.body.password;}
        
        try{
        const updatedUser = await userToUpdate.save();

        res.status(200).json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email: updatedUser.email,
            role:updatedUser.role,
            account:updatedUser.account
        })
        }catch(err){
            res.status(400)
            throw new Error('Could not update user role.')
        }
    }else {
        res.status(404)
        throw new Error('User not found')
    }

})



const deleteUser = asyncHandler(async (req, res)=>{

    // const user = await User.findById(req.user.id)


    // if(!user || req.user.role.toString()!== process.env.SA_ROLE){
    //     res.status(401)
    //     throw new Error('Not Authorized to delete user. are you privileged?')    
    // }

    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({_id:req.params.id})
    }catch(err){
        res.status(400)
        throw new Error('Could not delete user.')
    }
  

})


export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile,updateUserRole, deleteUser, fetchUsers}