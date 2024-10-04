const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const Role = require('../models/role.model'); // Thêm dòng này

const registerUser = async ({ firstName, lastName, email, phoneNumber, password }) => {
  // Kiểm tra xem email đã tồn tại chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email đã tồn tại');
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tìm vai trò USER
  const role = await Role.findOne({ name: 'USER' });
  if (!role) {
    throw new Error('Vai trò USER không tồn tại');
  }

  // Tạo tài khoản mới
  const newUser = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hashedPassword,
    verified: false, // Mặc định người dùng chưa được xác thực
    roles: [role._id], // Gán ID vai trò vào đây
  });

  return await newUser.save();
};

module.exports = { registerUser };
