const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { 
        type: String,
         required: true
         },
    description:{
         type: String 
        },
    duration:{
         type: String
         },
    fees:{
        type: Number
     },
   // college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    ratings: [{ type: Number }],
}, { timestamps: true });

courseSchema.virtual('averageRating').get(function() {
    if (this.ratings.length === 0) return null;
    const sum = this.ratings.reduce((a, b) => a + b, 0);
    return sum / this.ratings.length;
});

// Ensure virtuals are included in JSON and Object responses
courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);