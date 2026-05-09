const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerLimiter, registerValidation } = require('../middlewares/authMiddleware');

router.post('/register', registerLimiter, registerValidation, authController.register);
router.post('/verify-otp', authController.verifyOtp);

module.exports = router;