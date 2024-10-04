const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const setRole = require('../middleware/setRole');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo tài khoản thành công
 *       400:
 *         description: Lỗi khi tạo tài khoản
 */
router.post('/register', setRole, authController.register); // Thêm middleware setRole

module.exports = router;
