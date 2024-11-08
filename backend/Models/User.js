const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minlength: [3, 'Name should have at least 3 characters.'],
        maxlength: [100, 'Name should have at most 100 characters.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
    },
    mobileNumber: {
        type: String, 
        required: [true, 'Mobile number is required.'],
        unique: true,
        match: [/^\d{10}$/, 'Mobile number must be a 10-digit number.']
    },
    stream: {
        type: String,
        required: [true, 'Stream is required.'],
        enum: {
            values: ['Commerce and Banking', 'Design', 'Engineering', 'Management', 'Hotel Management', 'Medical'],
            message: '{VALUE} is not a valid stream.'
        }
    },
    level: {
        type: String,
        required: [true, 'Level is required.'],
        enum: {
            values: ['UG', 'PG', 'Diploma', 'Ph.D', 'Certificate'],
            message: '{VALUE} is not a valid level.'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [8, 'Password should have at least 8 characters.']
    },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
}, {
    timestamps: true 
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
