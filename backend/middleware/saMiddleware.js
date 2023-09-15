import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

        // SA_ROLE = Super admin, 
        // 600 = account admin (can add or remove users)
        // 500 = Campaign manager (can create, remove and run campaigns)
        // 100 = User (can view campaigns)

//sa = super admin
const sa = asyncHandler(async (req, res, next)=>{

    let token;

    token = req.cookies.jwt;

    if (token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')

            if (req.user.role === parseInt(process.env.SA_ROLE)) {
            next();
            } else {
                return res.status(403).json({ message: 'Access forbidden. User does not have the required access level.' });
            }


        }catch(error){
            res.status(401)
            throw new Error('Invalid Token')

        }

    }else {
        res.status(401)
        throw new Error('Not authorised, no token')
    }
})

export {sa}





     
