const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Các endpoint liên quan đến User
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Lấy thông tin của tất cả người dùng
 *     description: API này sẽ trả về danh sách tất cả người dùng trong hệ thống.
 *     responses:
 *       200:
 *         description: Danh sách người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID của người dùng
 *                       firstName:
 *                         type: string
 *                         description: Tên của người dùng
 *                       lastName:
 *                         type: string
 *                         description: Họ của người dùng
 *                       email:
 *                         type: string
 *                         description: Email của người dùng
 *                       phoneNumber:
 *                         type: string
 *                         description: Số điện thoại của người dùng
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Ngày tạo tài khoản
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Ngày cập nhật tài khoản
 *       500:
 *         description: Lỗi server
 */
router.get('/users', adminController.getAllUsers);
module.exports = router;