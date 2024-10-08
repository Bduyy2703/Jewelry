const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const otpGenerator = require('otp-generator'); // Thêm dòng này để yêu cầu module otp-generator
const { sendOTPVerificationEmail } = require('../mailler/mailOtp.js');
const redisClient = require('../config/redisClient.js');
const jwt = require('jsonwebtoken');


const registerUser = async ({ firstName, lastName, email, phoneNumber, password }) => {
  // Kiểm tra xem email đã tồn tại chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email đã tồn tại');
  }
  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);
  // Tạo OTP (6 số)
  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

  // Tạo tài khoản mới chưa lưu vào DB
  const newUser = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hashedPassword,
    verified: false, // Mặc định người dùng chưa được xác thực
    role: 'user', // Gán ID vai trò vào đây
    otp,  // Lưu OTP vào user để kiểm tra sau
    otpExpires: Date.now() + 10 * 60 * 100 // OTP có thời hạn 1 phút
  });

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  // Lưu vào Redis với key là email và giá trị là chuỗi JSON
  redisClient.set(email, JSON.stringify(newUser), 'EX', 600); // EX là tùy chọn để thiết lập thời gian hết hạn (600 giây = 10 phút)

  await sendOTPVerificationEmail(email, otp);

  // Trả về đối tượng user chưa được lưu (đợi xác nhận OTP)
  return { message: 'OTP đã được gửi, vui lòng kiểm tra email', userId: newUser._id };


};


// Xác thực OTP và lưu vào database
const verifyOTP = async (email, otp) => {
  // Lấy dữ liệu người dùng từ Redis
  redisClient.get(email, async (err, data) => {
    if (err || !data) {
      throw new Error('Người dùng không tồn tại hoặc OTP đã hết hạn');
    }

    const user = JSON.parse(data);

    // Kiểm tra thời gian hết hạn OTP
    if (user.otpExpires < Date.now()) {
      throw new Error('OTP đã hết hạn');
    }

    // So khớp OTP
    if (user.otp !== otp) {
      throw new Error('OTP không đúng');
    }

    // Xác nhận tài khoản và lưu vào DB
    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      verified: true,
      role: 'user',
    });

    // Lưu người dùng vào database
    await newUser.save();

    // Xóa dữ liệu người dùng tạm thời trong Redis
    redisClient.del(email);

    return { message: 'Tài khoản đã được xác nhận thành công và lưu vào cơ sở dữ liệu' };
  });
};


// login
const loginUser = async (email, password) => {
  // Tìm người dùng bằng email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email không tồn tại');
  }

  // So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Sai mật khẩu');
  }

  // Tạo Access Token (thời hạn ngắn)
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET, // Secret key để mã hóa Access Token
    { expiresIn: '1h' } // Thời gian hết hạn của Access Token
  );

  // Tạo Refresh Token (thời hạn dài hơn)
  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET, // Secret key khác để mã hóa Refresh Token
    { expiresIn: '7d' } // Thời gian hết hạn của Refresh Token (ví dụ: 7 ngày)
  );

  // Trả về cả Access Token và Refresh Token
  return {
    message: 'Đăng nhập thành công',
    accessToken,
    refreshToken
  };
};

module.exports = { registerUser, verifyOTP, loginUser };
