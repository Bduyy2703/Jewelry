const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Các endpoint liên quan đến User
 */

/**
 * @swagger
 * /users/profiles/{email}:
 *   get:
 *     tags: 
 *       - User 
 *     summary: Lấy thông tin chi tiết của người dùng dựa trên email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email của người dùng cần lấy thông tin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về thông tin chi tiết của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 age:
 *                   type: number
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/profiles/:email', userController.getProfileByEmail);

/**
 * @swagger
 * /users/profiles/update/{email}:
 *   post:
 *     tags: 
 *       - User
 *     summary: Cập nhật thông tin cá nhân dựa trên email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email của người dùng cần cập nhật   
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Dữ liệu cần cập nhật cho người dùng
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             addresses:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thông tin người dùng đã được cập nhật thành công
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */
router.post('/profiles/update/:email', userController.updateProfileByEmail);


/**
 * @swagger
 * /users/change-password/{email}:
 *   post:
 *     tags: 
 *       - User
 *     summary: Đổi mật khẩu của người dùng dựa trên email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email của người dùng cần đổi mật khẩu
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Dữ liệu đổi mật khẩu
 *         schema:
 *           type: object
 *           properties:
 *             oldPassword:
 *               type: string
 *               description: Mật khẩu cũ của người dùng
 *             newPassword:
 *               type: string
 *               description: Mật khẩu mới của người dùng
 *     responses:
 *       200:
 *         description: Mật khẩu đã được đổi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Mật khẩu cũ không đúng
 *       404:
 *         description: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi server
 */
router.post('/change-password/:email', userController.changePasswordByEmail);


module.exports = router;
