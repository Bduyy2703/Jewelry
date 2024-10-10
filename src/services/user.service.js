const UserProfile = require('../models/profile.model')

const getProfileByEmail = async (email) => {
    try {
      // Tìm người dùng dựa trên email và populate địa chỉ
      const userProfile = await UserProfile.findOne({ email }).populate('addresses');
      return userProfile; // Trả về profile nếu tìm thấy
    } catch (error) {
      throw new Error('Lỗi khi lấy thông tin người dùng');
    }
  };
  
  module.exports = {
    getProfileByEmail,
  };