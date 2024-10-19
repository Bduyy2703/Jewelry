// Trong product.routes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { upload } = require('../middleware/uploadMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Các endpoint liên quan đến Products
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Tạo một sản phẩm mới kèm chi tiết và hình ảnh
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_code:
 *                 type: string
 *                 description: Mã sản phẩm
 *                 example: "P001"
 *               product_name:
 *                 type: string
 *                 description: Tên sản phẩm
 *                 example: "Vòng cổ vàng"
 *               product_price:
 *                 type: number
 *                 description: Giá sản phẩm
 *                 example: 1500
 *               product_sale_price:
 *                 type: number
 *                 description: Giá khuyến mãi (nếu có)
 *                 example: 1200
 *               product_category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Danh sách ID của các danh mục sản phẩm
 *                 example: ["64b8f1e6f5c65d8e992eeb09", "64b8f1e6f5c65d8e992eeb10"]
 *               product_details:
 *                 type: object
 *                 description: Chi tiết sản phẩm
 *                 properties:
 *                   material:
 *                     type: string
 *                     description: Chất liệu sản phẩm
 *                     example: "Vàng 24k"
 *                   color:
 *                     type: string
 *                     description: Màu sắc sản phẩm
 *                     example: "Vàng"
 *                   length:
 *                     type: string
 *                     description: Chiều dài của sản phẩm
 *                     example: "40cm + 5cm"
 *                   care_instructions:
 *                     type: string
 *                     description: Hướng dẫn bảo quản
 *                     example: "Tránh tiếp xúc với hóa chất"
 *                   stone_size:
 *                     type: string
 *                     description: Kích thước của đá (nếu có)
 *                     example: "5mm"
 *                   stone_type:
 *                     type: string
 *                     description: Loại đá được sử dụng trong sản phẩm
 *                     example: "Đá quý tự nhiên"
 *                   design_style:
 *                     type: string
 *                     description: Phong cách thiết kế của sản phẩm
 *                     example: "Cổ điển"
 *               product_images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: Mảng các file ảnh sản phẩm (upload trực tiếp)
 *               product_isAvailable:
 *                 type: boolean
 *                 description: Trạng thái sản phẩm (còn hàng hay không)
 *                 example: true
 *               product_short_description:
 *                 type: string
 *                 description: Mô tả ngắn gọn về sản phẩm
 *                 example: "Vòng cổ vàng, thiết kế tinh tế"
 *     responses:
 *       201:
 *         description: Sản phẩm đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sản phẩm đã được tạo thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     product:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Yêu cầu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dữ liệu không hợp lệ"
 */
router.post('/', upload.array('product_images', 10), productController.createProduct);

module.exports = router;
