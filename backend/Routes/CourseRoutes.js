const express = require('express');
const router = express.Router();
const CourseController = require('../Contollers/CourseController');

router.post('/', CourseController.createCourse); 

router.get('/', CourseController.getAllCourses);

router.get('/:id', CourseController.getCourseById);

router.put('/:id', CourseController.updateCourse);

router.delete('/courses/:id', CourseController.deleteCourse);

module.exports = router;
