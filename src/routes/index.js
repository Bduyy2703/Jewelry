const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./user.route'); // Thay đổi đường dẫn nếu cần
const authRoutes = require('./auth.route');

// Đăng ký các routes
router.use('/users',userRoutes); // Đảm bảo sử dụng router cho users
router.use('/auth',authRoutes); 
module.exports = router;
