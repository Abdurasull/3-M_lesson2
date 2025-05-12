const Joi = require(`joi`);

const registerSchema = (req, res, next) => {
    const data1 = req.body;
    
    
    
    const data = {
        email: data1.email,
        password: data1.password,
    };
    
    const schema = Joi.object({
        email: Joi.string()
            
            .email({ tlds: { allow: false } }) // ".com", ".uz" shart emas
            .required()
            .messages({
            'string.email': 'Email noto‘g‘ri kiritildi',
            'string.empty': 'Email bo‘sh bo‘lmasligi kerak',
            }),
         password: Joi.string()
            .min(6)
            .max(32)
            .pattern(new RegExp('^[a-zA-Z0-9@#%&!]+$')) // faqat shartli belgilar
            .required()
            .messages({
            'string.min': 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak',
            'string.pattern.base': 'Parolda faqat harf, raqam yoki belgilar (@, #, %) bo‘lishi mumkin',
            'string.empty': 'Parol bo‘sh bo‘lmasligi kerak',
            }),
    });
    const error = schema.validate(data);
    
    if (error.error) {
        return res.status(400).json({
            status: 'error',
            message: error.error.details[0].message,
        });
    }
    next();
}

module.exports = registerSchema;
