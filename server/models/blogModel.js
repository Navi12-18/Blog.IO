import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    desc : {
        type : String,
        required : true
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },

    cover : {
        type : String,
    },

    coverImage : {
        type : String,
    },

    likes : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],

    date : {
        type : Date,
        default : Date.now
    },
},{timestamps : true});

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;