import mongoose from "mongoose";


const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true
    },
    status:{
        type: Number,
        required: true,
    },
    campaign:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    }
},{
    timestamps:  true
})


const Contact = mongoose.model('Contact',contactSchema);

export default Contact;