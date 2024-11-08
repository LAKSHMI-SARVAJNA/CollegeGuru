const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie.js");

const signup = async (req, res) => {
    try {
        const { name, email, mobileNumber, stream, level, password } = req.body;

      
        const existingUser = await UserModel.findOne({
            $or: [{ email }, { mobileNumber }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists. Please login instead.',
                success: false
            });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random()*900000).toString();
      
        const newUser = new UserModel({
            name,
            email,
            mobileNumber,
            stream,
            level,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        await newUser.save();

        //jwt
        generateTokenAndSetCookie(res, newUser._id);

        return res.status(201).json({
            message: 'Signup successful',
            success: true
        });

    } catch (err) {
        console.error("Signup Error:", err); 
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: 'Authentication failed. Email or password is incorrect.',
                success: false
            });
        }

     
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: 'Authentication failed. Email or password is incorrect.',
                success: false
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables.');
        }

        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            success: true,
            token,
            user: {
                email: user.email,
                name: user.name
            }
        });

    } catch (err) {
        console.error("Login Error:", err); 
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
