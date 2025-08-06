import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true,
    },
    name:{
        type: String,
        required:true,
    },
    password:{
        type:String,
        minLength: 6,
        required:true,
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"blogs",
    }]
})

const User = mongoose.model("users",userSchema)
export default User

