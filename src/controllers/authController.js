const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        await authService.register(email, password);
        return res.status(200).json({ message: "Đăng ký thành công. Vui lòng kiểm tra email để lấy OTP." });
    } catch (error) {
        if (error.message === 'EMAIL_EXISTS') {
            return res.status(409).json({ message: "Email đã tồn tại trong hệ thống." });
        }
        console.error(error);
        return res.status(500).json({ message: "Lỗi Server Internal" });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        await authService.verifyOtp(email, otp);
        return res.status(200).json({ message: "Xác thực thành công. Tài khoản đã được kích hoạt." });
    } catch (error) {
        if (error.message === 'OTP_INVALID') return res.status(400).json({ message: "Mã OTP không chính xác." });
        if (error.message === 'OTP_EXPIRED') return res.status(400).json({ message: "Mã OTP đã hết hạn." });
        return res.status(500).json({ message: "Lỗi Server Internal" });
    }
};

module.exports = { register, verifyOtp };