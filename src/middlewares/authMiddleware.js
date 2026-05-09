const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Rate limiting: 5 requests / 10 phút / 1 IP
const registerLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: { message: "Quá nhiều yêu cầu, vui lòng thử lại sau 10 phút." }
});

// Validation rules
const registerValidation = [
    body('email').isEmail().withMessage('Định dạng email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải từ 6 ký tự trở lên'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { registerLimiter, registerValidation };