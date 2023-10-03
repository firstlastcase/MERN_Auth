import mongoose from "mongoose";


const campaignSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    number:{
        type: Number,
        required: true,
    },
    purpose:{
        type: String,
        required: false
    },
    status:{
        type: Number,
        required: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    contactList:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactList',
        required: true,
    }
},{
    timestamps:  true
})


const Campaign = mongoose.model('Campaign',campaignSchema);

export default Campaign;