const User = require('../models/user.model');
const Invoice = require('../models/invoice.model'); 
const Product = require('../models/product.model');
const Discount = require('../models/discount.model'); 
const Category = require('../models/category.model');
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

    // Tính tổng amountToPay
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
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .select(
        "product_code product_name product_price product_sale_price product_category product_isAvailable product_short_description"
      )
      .populate({
        path: "product_details",
        select: "product_images",
        populate: {
          path: "product_images",
          select: "secure_url public_id asset_id",
          model: "Image",
        },
      });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin sản phẩm" });
  }
};
const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json({ discounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin mã giảm giá" });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select(
      "category_name category_slug category_type category_parentId"
    );

    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin danh mục" });
  }
};

module.exports = {
  getAllUsers,
  getAllInvoices,
  getAllProducts,
  getAllDiscounts,
  getAllCategories,
};