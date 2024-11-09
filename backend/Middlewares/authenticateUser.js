const jwt = require('jsonwebtoken');
const User = require('../Models/User'); 

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const user = await User.findById(decoded._id); 

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        req.user = user;
        next(); 
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

module.exports = authenticateUser;
