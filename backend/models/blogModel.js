import mongoose from "mongoose"

const blogSchema = mongoose.Schema({
    author:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    },
    title:{
        type:String,
        required:true,
        index:true
    },
    tags:[{
        type: String,
        validate: {
            validator: function(tag) {
                return tag.length <= 30;
            },
            message: props => `Tag "${props.value}" exceeds the maximum length of 10 characters.`
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minlength: 250
    },
    photo: {
        type: String,
        required:true
    },
})

const Todo = mongoose.model("blogs",blogSchema)
export default Todo