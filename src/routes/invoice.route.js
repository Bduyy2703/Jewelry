const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice.controller');

/**
 * @swagger
 * tags:
 *   - name: Invoice
 *     description: Các endpoint liên quan đến Invoice
 */

/**
 * @swagger
 * /invoices/getAll:
 *   get:
 *     summary: Lấy tất cả hóa đơn của người dùng theo ID
 *     tags: [Invoice]
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách hóa đơn của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Yêu cầu không hợp lệ
 *       404:
 *         description: Không tìm thấy hóa đơn
 *       500:
 *         description: Lỗi server
 */

// Chỉnh sửa route để lấy userId từ query parameters
router.get('/getAll', invoiceController.getAllInvoiceByUser);


/**
 * @swagger
 * /invoices/getInvoiceDetail:
 *   get:
 *     summary: Lấy thông tin chi tiết của một hóa đơn theo ID
 *     tags: [Invoice]
 *     parameters:
 *       - name: invoiceId
 *         in: query
 *         required: true
 *         description: ID của hóa đơn
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 orderCode:
 *                   type: string
 *                 purchaseDate:
 *                   type: string
 *                   format: date-time
 *                 paymentMethod:
 *                   type: string
 *                 amountToPay:
 *                   type: number
 *                 status:
 *                   type: string
 *       400:
 *         description: Yêu cầu không hợp lệ
 *       404:
 *         description: Không tìm thấy hóa đơn
 *       500:
 *         description: Lỗi server
 */

router.get('/getInvoiceDetail', invoiceController.getInvoiceDetailsById);


module.exports = router;
