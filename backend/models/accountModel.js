import mongoose from "mongoose";


const accountSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    number:{
        type: Number,
        required: true,
        unique: true
    },
    status:{
        type: Number,
        required: true,
    }
},{
    timestamps:  true
})


const Account = mongoose.model('Account',accountSchema);

export default Account;