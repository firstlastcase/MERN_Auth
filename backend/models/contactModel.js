import mongoose from "mongoose";


const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: false,
    },
    phoneNumber:{
        type: String,
        required: true
    },
    status:{
        type: Number,
        required: false,
    },
    everContacted:{
        type: Boolean,
        required: true,
    },
    lastContactedDate: {
        type: Date,
        required: false
    }
    // ,
    // contactList:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'contactList',
    //     required: true
    // }
},{
    timestamps:  true
})


const Contact = mongoose.model('Contact',contactSchema);

export default Contact;