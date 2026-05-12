const authService = require('../services/authService');

const forgotPassword = async (req, res) => {
    try {

        const result = await authService.forgotPassword(
            req.body.email
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {

        const result = await authService.resetPassword(
            req.body.email,
            req.body.otp,
            req.body.newPassword
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    forgotPassword,
    resetPassword
};