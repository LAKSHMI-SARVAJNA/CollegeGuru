const jwt = require('jsonwebtoken');
const User = require('../Models/User'); // Adjust path as needed

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming token is passed in the format "Bearer <token>"

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret
        const user = await User.findById(decoded._id); // Find user by ID from the decoded token

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        req.user = user; // Attach user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

module.exports = authenticateUser;
