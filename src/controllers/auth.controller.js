const authService = require('../services/auth.service');
// đăng kí
const register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    const result = await authService.registerUser({ firstName, lastName, email, phoneNumber, password });
    res.status(201).json({ message: 'Tạo tài khoản thành công', user: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Controller xác thực OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body; // Sửa lại để nhận email
  try {
    const result = await authService.verifyOTP(email, otp); // Sửa lại để truyền email
    res.status(200).json(result); // Gửi phản hồi nếu xác thực thành công
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);
    res.status(200).json(result); // Gửi phản hồi với token nếu đăng nhập thành công
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Hàm làm mới Access Token
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh Token không hợp lệ' });
  }

  try {
    // Kiểm tra và xác thực Refresh Token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }

    // Tạo Access Token mới
    const newAccessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// Export các controller
module.exports = { login, register, verifyOTP, refreshAccessToken };

