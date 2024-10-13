
const User = require('../models/user.model');

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); // Giả sử User là mô hình của người dùng
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng' });
    }
  };
  
  module.exports = {
    getAllUsers,
  };