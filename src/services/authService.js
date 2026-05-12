const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Otp = require('../models/OTP');

const generateOTP = require('../utils/generateOTP');
const sendOTP = require('../utils/mailer');

const forgotPassword = async (email) => {

    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw new Error('EMAIL_NOT_FOUND');
    }

    const otp = generateOTP();

    const expired = new Date(
        Date.now() + 5 * 60 * 1000
    );

    await Otp.create({
        email,
        otp_code: otp,
        expiresAt: expired
    });

    await sendOTP(email, otp);

    return {
        message: 'OTP_SENT'
    };
};

const resetPassword = async (
    email,
    otp,
    newPassword
) => {

    const otpRecord = await Otp.findOne({
        where: {
            email,
            otp_code: otp
        },
        order: [['createdAt', 'DESC']]
    });

    if (!otpRecord) {
        throw new Error('OTP_INVALID');
    }

    if (new Date() > otpRecord.expiresAt) {
        throw new Error('OTP_EXPIRED');
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    await User.update(
        {
            password: hashedPassword
        },
        {
            where: { email }
        }
    );

    await Otp.destroy({
        where: { email }
    });

    return {
        message: 'PASSWORD_RESET_SUCCESS'
    };
};

module.exports = {
    forgotPassword,
    resetPassword
};