const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    ratings: [{ type: Number }],
    reviews: [{ 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reviewText: { type: String },
        rating: { type: Number }
    }]
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);
