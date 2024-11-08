const Notification = require('../Models/Notification');
const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST, 
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
    }
});
const sendNotification = async (userId, message, courseId) => {
    try {
        const notification = new Notification({
            userId: userId,
            message: message,
            courseId: courseId 
        });
        const mailOptions = {
            from: process.env.MAILTRAP_FROM, 
            to: process.env.MAILTRAP_TO, 
            subject: 'Course Update Notification', 
            text: message 
        };

        await transporter.sendMail(mailOptions);
        await notification.save();
        console.log(`Notification sent to user ${userId}: ${message}`);
    } catch (err) {
        console.error('Error sending notification:', err);
    }
};

module.exports = { sendNotification };