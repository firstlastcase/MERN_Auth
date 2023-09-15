import asyncHandler from 'express-async-handler'
import Contact from "../models/contactModel.js"
import User from "../models/userModel.js"
import axios from 'axios'

// const ZD_AUTH = process.env.ZD_AUTH;



// @description     Add a new contact 
// route            POST /api/contact
// @access          Private
const addNewContact = asyncHandler(async (req, res)=>{
    const {name, phoneNumber} = req.body
    const contactExists = await Contact.findOne({phoneNumber})
    if (contactExists){
        res.status(400)
        throw new Error('Contact already exists!!')
    }

    const contact = await Contact.create({name, phoneNumber, status:0});

    if (contact){
        res.status(201).json({
            _id:contact._id,
            name:contact.name,
            phoneNumber: contact.phoneNumber
        })
    }else{
        res.status(400);
        throw new Error('Invalid contact data')
    }

})


// @description     Delete contact 
// route            delete /api/contact/:id
// @access          Private
const deleteContact = asyncHandler(async (req, res)=>{

    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(400)
        throw new Error('contact not found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(404)
        throw new Error('could not find user')
    }

    if(contact.user.toString() !== user.id){
        res.status(401)
        throw new Error('Not Authorised')
    }
      
    // await goal.remove()
    await Contact.findByIdAndRemove(req.params.id)
    res.status(200).json({id:req.params.id})
  
    // res.status(200).json({message:'this is just a placeholder message!! - Contact deleted successfully'})
})

// @description     Get contact
// route            Get /api/contact/:id
// @access          Private
const getContact = asyncHandler(async (req, res)=>{

    const contact = await Contact.findById(req.params.id)
    res.status(200).json(contact)

})


// @description     register contact for outbound dialing
// route            Post /api/contact/:id
// @access          Private
const registerContact = asyncHandler(async (req, res)=>{

    const contact = await Contact.findById(req.params.id)

    if (!contact){
        res.status(400)
        throw new Error('contact not found')
    }

    // console.log(JSON.stringify(contact))

    const data = JSON.stringify({
        "callback_request": {
            "phone_number_id": 360003239175,
            // "requester_phone_number": contact.phoneNumber,
            "requester_phone_number": contact.phoneNumber,
        }
        });

    const config = {
        method: 'POST',
        url: 'https://z3nabdullahali.zendesk.com/api/v2/channels/voice/callback_requests',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic'+' '+process.env.ZD_AUTH, // Base64 encoded "username:password"
        },
        data : data,
        };
        try {
            const response = await axios(config)
            res.status(200).json(response.data)

        } catch (error) {
               res.status(500)
                throw new Error('An Error occurred while making the API request to Zendesk')
            // console.error(error);
            // res.status(500).json({ error: 'An error occurred while making the API request.' });
        }

    
})

// @description     Update contact
// route            Put /api/contact/:id
// @access          Private
const updateContact = asyncHandler(async (req, res)=>{

    const contact = await Contact.findById(req.params.id)
    // const contact = await Contact.findById(req.contact._id)

    if (contact){
        contact.name = req.body.name || contact.name
        contact.phoneNumber = req.body.phoneNumber || contact.phoneNumber;

        const updatedContact = await contact.save();

        res.status(200).json({
            _id: updatedContact._id,
            name:updatedContact.name,
            phoneNumber: updatedContact.phoneNumber,
            status: updatedContact.status||0
        })
    }else {
        res.status(404)
        throw new Error('Contact not found')
    }
    // res.status(200).json({message:'Update Contact Profile'})
})

export { registerContact, getContact, updateContact, addNewContact, deleteContact}