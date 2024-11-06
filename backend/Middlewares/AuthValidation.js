const Joi = require('joi');


const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.empty': 'Name is required.',
                'string.min': 'Name should have a minimum length of 3.',
                'string.max': 'Name should have a maximum length of 100.'
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please enter a valid email address.',
                'string.empty': 'Email is required.'
            }),
        mobileNumber: Joi.string()
            .pattern(/^[0-9]{10}$/) 
            .required()
            .messages({
                'string.pattern.base': 'Mobile number must be a 10-digit number.',
                'string.empty': 'Mobile number is required.'
            }),
        stream: Joi.string()
            .required()
            .messages({
                'string.empty': 'Stream is required.'
            }),
        level: Joi.string()
            .required()
            .messages({
                'string.empty': 'Level is required.'
            }),
        password: Joi.string()
            .min(8)
            .max(100)
            .required()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .messages({
                'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character.',
                'string.empty': 'Password is required.'
            })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            errors: error.details.map((err) => err.message) 
        });
    }
    next();
};


const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please enter a valid email address.',
                'string.empty': 'Email is required.'
            }),
        password: Joi.string()
            .min(8)
            .max(100)
            .required()
            .messages({
                'string.min': 'Password should have a minimum length of 8.',
                'string.max': 'Password should have a maximum length of 100.',
                'string.empty': 'Password is required.'
            })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            errors: error.details.map((err) => err.message)
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
