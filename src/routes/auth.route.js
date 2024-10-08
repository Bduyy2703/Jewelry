const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

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
 *         description: Tạo tài khoản thành công và gửi OTP qua email
 *       400:
 *         description: Lỗi khi tạo tài khoản
 */
router.post('/register', authController.register); // Đăng ký tài khoản và gửi OTP

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Xác thực OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Xác thực thành công
 *       400:
 *         description: Lỗi xác thực OTP
 */
router.post('/verify-otp', authController.verifyOTP); // Xác thực OTP

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về JWT token
 *       400:
 *         description: Thông tin đăng nhập không hợp lệ
 *       401:
 *         description: Sai mật khẩu hoặc email
 */
router.post('/login', authController.login); // Đăng nhập tài khoản

// Route làm mới Access Token
router.post('/refresh-token', authController.refreshAccessToken); 
module.exports = router;
