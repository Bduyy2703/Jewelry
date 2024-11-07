
const User = require('../models/user.model');
const Invoice = require('../models/invoice.model');
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); // Giả sử User là mô hình của người dùng
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng' });
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