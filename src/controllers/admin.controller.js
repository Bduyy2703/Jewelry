
const User = require('../models/user.model');
const Invoice = require('../models/invoice.model');
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate({
      path: "user_profile", // Populate profile dựa trên ObjectId trong userProfile
      model: "Profile",
      populate: {
        path: "profile_addresses", // Tiếp tục populate địa chỉ trong Profile
        model: "Address", // Liên kết đến model Address
      },
    });
    const formattedUsers = users.map((user) => {
      return {
        email : user.email,
        fullName:
          user.user_profile.firstName + user.user_profile.lastName,
        phone: user.user_profile.phoneNumber,
        verified:
        user.verified + "" === "true" ? "Đã kích hoạt" : "Chưa",
        createdAt : user.createdAt,
      };
    });
    res.status(200).json({ users: formattedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
  }
};
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();

    // Tính tổng `amountToPay`
    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amountToPay, 0);

    res.status(200).json({
      invoices,
      totalRevenue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin hóa đơn' });
  }
};

module.exports = {
  getAllUsers,
  getAllInvoices
};