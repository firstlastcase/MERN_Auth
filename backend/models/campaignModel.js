import mongoose from "mongoose";


const campaignSchema = mongoose.Schema({
    name:{
        type: String,
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


const Campaign = mongoose.model('Campaign',campaignSchema);

export default Campaign;