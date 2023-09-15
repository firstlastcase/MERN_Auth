import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: Number,
        required: false,
        // 707 = Super admin, 
        // 600 = account admin (can add or remove users)
        // 500 = Campaign manager (can create, remove and run campaigns)
        // 100 = User (can view campaigns)
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    }
},{
    timestamps:  true
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User',userSchema);

export default User;