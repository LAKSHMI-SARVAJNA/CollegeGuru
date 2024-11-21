const express = require('express');
const router = express.Router();
const CourseController = require('../Contollers/CourseController');
const authenticateUser = require('../Middlewares/authenticateUser');
const sanitizeInput = require('../Middlewares/sanitizeInput')

router.post('/' , CourseController.createCourse); 

router.get('/', CourseController.getAllCourses);

router.get('/:id', CourseController.getCourseById);

router.put('/:id', CourseController.updateCourse);


router.delete('/:id', CourseController.deleteCourse);

router.post('/:courseId/reviews', CourseController.addReview);

router.get('/:courseId/reviews', CourseController.getCourseReviews);

router.post('/enroll', authenticateUser, CourseController.enrollInCourse);

module.exports = router;
