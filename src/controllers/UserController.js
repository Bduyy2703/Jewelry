const profileService = require('../services/user.service');

// API lấy thông tin chi tiết của người dùng dựa trên email
exports.getProfileByEmail = async (req, res) => {
  const { email } = req.params; // Lấy email từ URL
  console.log(email)
  try {
    // Gọi service để lấy profile

    const profile = await profileService.getProfileByEmail(email);

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