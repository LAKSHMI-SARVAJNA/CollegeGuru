const { required, number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobileNumber:{
        type:Number,
        required: true,
        unique: true
    },
    stream:{
        type: String,
        required: true,
        enum:['Commerce and Banking','Design','Engineering','Management','Hotel Management','Medical']
    },
    level:{
        type: String,
        required: true,
        enum:['UG','PG','Diploma','Ph.D','Certificate']
    },
    password:{
        type: String,
        required: true,
    },

});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;