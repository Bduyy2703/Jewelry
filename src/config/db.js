const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('DB URI:', process.env.DB_URI); // Kiểm tra biến môi trường
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Dừng ứng dụng nếu kết nối thất bại
  }
};
module.exports = connectDB;
