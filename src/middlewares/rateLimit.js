const rateLimit = require('express-rate-limit');

const forgotPasswordLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: 'Too many requests, try again later'
});

module.exports = forgotPasswordLimiter;