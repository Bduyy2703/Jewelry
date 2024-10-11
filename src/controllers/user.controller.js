const profileService = require('../services/user.service');

// API lấy thông tin chi tiết của người dùng dựa trên email
const getProfileByEmail = async (req, res) => {
  console.log(req.params)
  const { email } = req.params; // Lấy email từ URL
  console.log(email)
  try {
    // Gọi service để lấy profile
    const user = await profileService.getProfileByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
     // Kiểm tra xem userProfile có tồn tại không
     if (!user.userProfile) {
      return res.status(404).json({ message: 'Không tìm thấy profile của người dùng' });
    }
    // Trả về thông tin chi tiết của người dùng
    res.status(200).json({
      firstName: user.userProfile.firstName,
      lastName: user.userProfile.lastName,
      email: user.email,  // Email được lấy từ mô hình User
      phoneNumber: user.userProfile.phoneNumber,
      addresses: user.userProfile.addresses, // Trả về thông tin địa chỉ đã populate
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfileByEmail = async (req, res) => {
  const { email } = req.params; // Lấy email từ URL
  const updatedData = req.body; // Lấy dữ liệu cập nhật từ body
  console.log(email)
  console.log(req.body)
  console.log(updatedData)
  try {
    // Gọi service để cập nhật thông tin người dùng
    const updatedUser = await profileService.updateProfileByEmail(email, updatedData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    // Trả về thông tin chi tiết của người dùng đã cập nhật
    res.status(200).json({
      message: 'Cập nhật thông tin người dùng thành công',
      updatedUser: {
        firstName: updatedUser.userProfile.firstName,
        lastName: updatedUser.userProfile.lastName,
        email: updatedUser.email,
        phoneNumber: updatedUser.userProfile.phoneNumber,
        addresses: updatedUser.userProfile.addresses,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const changePasswordByEmail = async (req, res) => {
  console.log(req.params)
  const { email } = req.params; // Lấy email từ URL
  console.log(email)
  try {
    // Gọi service để lấy profile

    const profile = await profileService.changePasswordByEmail(email);

    if (!profile) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Trả về thông tin chi tiết của người dùng
    res.status(200).json({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      addresses: profile.addresses, // Trả về thông tin địa chỉ đã populate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {getProfileByEmail ,changePasswordByEmail,updateProfileByEmail}