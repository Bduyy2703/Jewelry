const express = require('express');
const router = express.Router();

// Import routes
const adminRoutes = require('./admin.route')
const userRoutes = require('./user.route'); // Thay đổi đường dẫn nếu cần
const authRoutes = require('./auth.route');
const categoriesRoutes = require('./category.route')

// Đăng ký các routes
router.use('/users', userRoutes); // Đảm bảo sử dụng router cho users
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/categories', categoriesRoutes)
module.exports = router;
