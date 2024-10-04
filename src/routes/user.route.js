const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     responses:
 *       200:
 *         description: Trả về danh sách người dùng
 */
router.get('/', (req, res) => {  // Chú ý: sử dụng '/' ở đây
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ]);
});

module.exports = router;
