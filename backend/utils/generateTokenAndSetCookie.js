const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();

const generateTokenAndSetCookie = (res,userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("token",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV ==="production" , 
        sameSite:"strict"
    });
    return token;
}

module.exports = generateTokenAndSetCookie;