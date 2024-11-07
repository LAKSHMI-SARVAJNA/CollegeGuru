const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: String },
    fees: { type: Number },
   // college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    ratings: [{ type: Number }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);