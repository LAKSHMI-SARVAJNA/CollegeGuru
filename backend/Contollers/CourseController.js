const User = require('../Models/User.js');
const Course = require('../Models/Course.js');  
const { sendNotification } = require('../services/notificationService.js');
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
      
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit;

      
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
            filter.title = new RegExp(req.query.title, 'i'); 
        }

        const sortBy = req.query.sort ? req.query.sort.split(',').join(' ') : 'createdAt';

        const courses = await Course.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit);

        const total = await Course.countDocuments(filter);

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

        const usersEnrolled = await User.find({ enrolledCourses: { $in: [course._id] } });

        for (let user of usersEnrolled) {
            const message = `The course "${course.title}" has been updated. Check out the new details!`;
            await sendNotification(user._id, message, course._id,user.email); 
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

const addReview = async (req, res) => {
    const { courseId } = req.params;
    const { userId, reviewText, rating } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        const review = { userId, reviewText, rating };
        course.reviews.push(review);

        await course.save();
        res.status(200).json({ success: true, message: 'Review added', data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCourseReviews = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('reviews.userId', 'name'); 
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, data: course.reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const enrollInCourse = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'User is not authenticated' });
        }
        const userId = req.user._id;  
        const { courseId } = req.body; 
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ success: false, message: 'User is already enrolled in this course' });
        }

        user.enrolledCourses.push(courseId);
        course.enrolledUsers.push(userId);
        await user.save();

     
        await course.save();

        res.status(200).json({
            success: true,
            message: `User ${user.name} successfully enrolled in course ${course.title}`,
            data: { userId, courseId }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to enroll in course' });
    }
};


module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    addReview,
    getCourseReviews,
    enrollInCourse
};
