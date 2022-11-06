const mongoose = require("mongoose")


const usersSchema= new mongoose.Schema({
    user:{
        type:String,
        required:true,
        trim: true
    },
    password:{
        type:String,
        required: true,
        trim: true, 
    },
    rating:{
        type:String, 
        required: true,
        trim: true,
    },
    num_of_ratings:{
        type:String,
        required: true,
        trim: true,
    },
    subjects:{
        type:String,
        required: true,
        trim: true,
    },
})

usersSchema.index({'$**': 'text'});
const usersModel = mongoose.model('users', usersSchema)
module.exports = usersModel