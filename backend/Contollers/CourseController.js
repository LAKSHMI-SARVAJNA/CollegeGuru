
const Course = require('../models/Course');  

const createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllCourses = async (req, res) => {
  
  
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 courses per page
        const skip = (page - 1) * limit;

        // Filtering
        let filter = {};
        if (req.query.duration) {
            filter.duration = req.query.duration;
        }
        if (req.query.minFees && req.query.maxFees) {
            filter.fees = { $gte: parseInt(req.query.minFees), $lte: parseInt(req.query.maxFees) };
        }
        if (req.query.minRating) {
            filter.ratings = { $gte: parseFloat(req.query.minRating) };
        }
        if (req.query.title) {
            filter.title = new RegExp(req.query.title, 'i'); // Case-insensitive title search
        }

        // Sorting
        const sortBy = req.query.sort ? req.query.sort.split(',').join(' ') : 'createdAt';

        // Query with filtering, sorting, and pagination
        const courses = await Course.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit);

        // Total count of documents that match the filter
        const total = await Course.countDocuments(filter);

        // Response with pagination metadata
        res.status(200).json({
            success: true,
            data: courses,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
  
  
  
  
   
};
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, data: course });
        } catch (error) {
        res.status(500).json({ success: false, message: error.message });
             }
};
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};
