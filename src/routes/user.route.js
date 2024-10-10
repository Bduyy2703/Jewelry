const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Các endpoint liên quan đến User
 */

/**
 * @swagger
 * /profiles/{email}:
 *   get:
 *     tags: [User] 
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
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/profiles/:email', userController.getProfileByEmail);

module.exports = router;
