const mongoose = require("mongoose")

const LoginuserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        email:{
            type: String,
            required:true
        },
        mobileNo:{
            type: Number,
            required:true
        },
        messages:{
            type:String,
            default:"No messages"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", LoginuserSchema);
