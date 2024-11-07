
const Course = require('../models/Course');  // Import the Course model

// Create a new course
const createCourse = async (req, res) => {
    try {
        // Create a new course instance using the data from the request body
        const course = new Course(req.body);

        // Save the course to the database
        await course.save();

        // Send a success response
        res.status(201).json({ success: true, data: course });
    } catch (error) {
        // Handle any errors that occur during saving
        res.status(500).json({ success: false, message: error.message });
    }
};
// Get all courses
const getAllCourses = async (req, res) => {
    try {
        // Find all courses
        const courses = await Course.find();

        // Send a success response with all courses
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        res.status(500).json({ success: false, message: error.message });
    }
};
// Get a course by ID
const getCourseById = async (req, res) => {
    try {
        // Find the course by ID from the URL parameter
        const course = await Course.findById(req.params.id);

        // If the course is not found, return a 404 response
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Return the course data
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update a course by ID
const updateCourse = async (req, res) => {
    try {
        // Find and update the course using the ID from the URL and the updated data from the request body
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // If the course is not found, return a 404 response
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Return the updated course data
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        // Handle any errors that occur during the update
        res.status(500).json({ success: false, message: error.message });
    }
};
// Delete a course by ID
const deleteCourse = async (req, res) => {
    try {
        // Find and delete the course by ID
        const course = await Course.findByIdAndDelete(req.params.id);

        // If the course is not found, return a 404 response
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Return a success message indicating the course has been deleted
        res.status(200).json({ success: true, message: 'Course deleted' });
    } catch (error) {
        // Handle any errors that occur during the deletion
        res.status(500).json({ success: false, message: error.message });
    }
};











// Export functions correctly
module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};
