const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username: {
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    birthdate: {
        type:Date,
        default: Date.now,
        require:false
    },
    password: {
        type:String,
        require:true
    },
    sex: {
        type:Boolean,
        require:true
    },
    weight: {
        type:Number,
        require:true
    }
    
})


module.exports = mongoose.model('User',UserSchema);