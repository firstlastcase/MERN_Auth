import mongoose from "mongoose";
import Contact from "./contactModel.js"


const contactListSchema = mongoose.Schema({

    contacts:[Contact.schema],
    
    name:{
        type: String,
        required: true,
    },
    number:{
        type: Number,
        required: true,
    },
    status:{
        type: Number,
        required: false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: false,
    }
},{
    timestamps:  true
})


const ContactList = mongoose.model('ContactList',contactListSchema);

export default ContactList;