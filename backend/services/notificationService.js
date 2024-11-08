const Notification = require('../Models/Notification');

// Simulate sending a notification by saving it to the database
const sendNotification = async (userId, message) => {
    try {
        const notification = new Notification({
            userId: userId,
            message: message
        });
        await notification.save();
        console.log(`Notification sent to user ${userId}: ${message}`);
    } catch (err) {
        console.error('Error sending notification:', err);
    }
};

// In a real-world app, this could be an email or SMS notification service
module.exports = { sendNotification };