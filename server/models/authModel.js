import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
        unique : true
    }
})

const authModel = new mongoose.model("User", authSchema);

export default authModel;