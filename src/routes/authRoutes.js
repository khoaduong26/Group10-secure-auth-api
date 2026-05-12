const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

const authController = require('../controllers/authController');

const validate = require('../middlewares/validate');

const forgotPasswordLimiter = require('../middlewares/rateLimit');

router.post(
    '/forgot-password',

    forgotPasswordLimiter,

    body('email')
        .isEmail()
        .withMessage('Invalid email'),

    validate,

    authController.forgotPassword
);

router.post(
    '/reset-password',

    body('email')
        .isEmail(),

    body('otp')
        .notEmpty(),

    body('newPassword')
        .isLength({ min: 6 }),

    validate,

    authController.resetPassword
);

module.exports = router;