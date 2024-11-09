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
         minimumEligibility: {
            type: String,
            required: true,
            
          },
          upperAgeLimit: {
            type: String,
          
          },

          entranceExams: {
            type: [String],
            required: true,
           
          },
          admissionProcess: {
            type: String,
            required: true,
       
          },
          managementQuotaAvailable: {
            type: Boolean,
            default: true,
          },
          averageFee: {
            type: Number,
            required: true,
          
          },
          scholarships: {
            type: [String],
          },
          internships: {
            type: String,
 
          },
          averageStipendForInternships: {
            type: String,
          },
          averageStartingSalary: {
            type: String,
          },
          careerOptions: {
            type: [String]
          },
   
    college: {
        type: String,
       enum: [
            "Greenwood University",
            "Hillside College of Arts",
            "Lakeview Technical Institute",
            "Northfield Polytechnic",
            "Brighton School of Management",
            "Sunrise College of Technology",
            "Silver Valley University",
            "Riverside University",
            "Crestwood University of Science",
            "Maple Leaf College"
        ]
     },
    ratings: [{ type: Number }],

    reviews: [{ 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reviewText: { type: String },
        rating: { type: Number }
    }],
    enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, { timestamps: true });

courseSchema.virtual('averageRating').get(function() {
    if (this.ratings.length === 0) return null;
    const sum = this.ratings.reduce((a, b) => a + b, 0);
    return sum / this.ratings.length;
});

courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);