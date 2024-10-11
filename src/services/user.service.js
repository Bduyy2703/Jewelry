const User = require('../models/user.model');
const getProfileByEmail = async (email) => {
  try {
    // Tìm người dùng dựa trên email và populate thông tin từ bảng Profile và Address
    const user = await User.findOne({ email }).populate({
      path: 'userProfile',       // Populate profile dựa trên ObjectId trong userProfile
      model: 'Profile',
      populate: { 
        path: 'addresses',       // Tiếp tục populate địa chỉ trong Profile
        model: 'Address'         // Liên kết đến model Address
      }
    });
    // Nếu không tìm thấy người dùng
    if (!user) {
      return null;
    }
    return user
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin người dùng');
  }
};

const updateProfileByEmail = async (email ,updatedData) => {
  try {
    // Tìm người dùng dựa trên email và populate thông tin từ bảng Profile và Address
    const user = await User.findOne({ email }).populate({
      path: 'userProfile',       // Populate profile dựa trên ObjectId trong userProfile
      model: 'Profile',
      populate: { 
        path: 'addresses',       // Tiếp tục populate địa chỉ trong Profile
        model: 'Address'         // Liên kết đến model Address
      }
    });
    // Nếu không tìm thấy người dùng
    if (!user) {
      return null;
    }
    console.log(updatedData)
    console.log(updatedData.firstName)
     // Cập nhật thông tin trong userProfile
     user.userProfile.firstName = updatedData.firstName || user.userProfile.firstName;
     console.log(user.userProfile.firstName)
     user.userProfile.lastName = updatedData.lastName || user.userProfile.lastName;
     user.userProfile.phoneNumber = updatedData.phoneNumber || user.userProfile.phoneNumber;
     user.userProfile.addresses = updatedData.addresses || user.userProfile.addresses;

     // Lưu lại thông tin đã cập nhật
    await user.userProfile.save();
    return user
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin người dùng' , error.message);
  }
};

const changePasswordByEmail = async (email) => {
  try {
    // Tìm người dùng dựa trên email và populate thông tin từ bảng Profile và Address
    const user = await User.findOne({ email }).populate({
      path: 'userProfile',       // Populate profile dựa trên ObjectId trong userProfile
      model: 'Profile',
      populate: { 
        path: 'addresses',       // Tiếp tục populate địa chỉ trong Profile
        model: 'Address'         // Liên kết đến model Address
      }
    });
    // Nếu không tìm thấy người dùng
    if (!user) {
      return null;
    }
    return user
  } catch (error) {
    throw new Error('Lỗi khi lấy thông tin người dùng');
  }
};
module.exports = {
  getProfileByEmail, 
  updateProfileByEmail,
  changePasswordByEmail,
};
