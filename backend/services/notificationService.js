const Notification = require('../Models/Notification');

const sendNotification = async (userId, message, courseId) => {
    try {
        const notification = new Notification({
            userId: userId,
            message: message,
            courseId: courseId 
        });
        await notification.save();
        console.log(`Notification sent to user ${userId}: ${message}`);
    } catch (err) {
        console.error('Error sending notification:', err);
    }
};

module.exports = { sendNotification };