const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

/**
 * @swagger
 * tags:
 *   - name: Payment
 *     description: Các endpoint Payment
 */

/**
 * @swagger
 * /payment:
 *   post:
 *     tags: [Payment]
 *     summary: Xử lý thanh toán
 *     description: Nhận thông tin thanh toán từ người dùng và trả về thông tin thanh toán
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailtoken:
 *                 type: string
 *                 description: Token email của người dùng (nếu cần)
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       description: ID của sản phẩm
 *                     quantity:
 *                       type: integer
 *                       description: Số lượng của sản phẩm
 *               discount_id:
 *                 type: string
 *                 description: ID của mã giảm giá
 *     responses:
 *       200:
 *         description: Thông tin thanh toán thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Thanh toán thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalAmount:
 *                       type: number
 *                       example: 100000
 *                     discountApplied:
 *                       type: number
 *                       example: 10000
 *       400:
 *         description: Thông tin không hợp lệ
 *       500:
 *         description: Lỗi server
 */

router.post("/", paymentController.confirmInforPayment);

/**
 * @swagger
 * /payment/create:
 *   post:
 *     tags: [Payment]
 *     summary: Xử lý thanh toán
 *     description: Nhận thông tin thanh toán từ người dùng và trả về thông tin thanh toán
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email của người dùng
 *               name:
 *                 type: string
 *                 description: Tên của người dùng
 *               phoneNumber:
 *                 type: string
 *                 description: Số điện thoại của người dùng
 *               address:
 *                 type: string
 *                 description: ID của địa chỉ có sẵn (được chọn từ danh sách địa chỉ của người dùng)
 *               otherAddress:
 *                 type: object
 *                 description: Địa chỉ khác nếu có (tạo mới)
 *                 properties:
 *                   country:
 *                     type: string
 *                     description: Quốc gia
 *                     example: "Vietnam"
 *                   city:
 *                     type: string
 *                     description: Thành phố
 *                     example: "Hanoi"
 *                   district:
 *                     type: string
 *                     description: Quận/Huyện
 *                     example: "Hoan Kiem"
 *                   addressLine:
 *                     type: string
 *                     description: Địa chỉ chi tiết
 *                     example: "123 Đường ABC"
 *               paymentMethod:
 *                 type: string
 *                 description: Phương thức thanh toán
 *                 enum: [vnpay, cod, momo]
 *               items:
 *                 type: array
 *                 description: Danh sách sản phẩm và số lượng
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       description: ID của sản phẩm
 *                     quantity:
 *                       type: integer
 *                       description: Số lượng của sản phẩm
 *               discount_id:
 *                 type: string
 *                 description: ID của mã giảm giá
 *               totalAmount:
 *                 type: number
 *                 description: Tổng giá tiền trước khi giảm
 *     responses:
 *       200:
 *         description: Thông tin thanh toán thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Thanh toán thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     name:
 *                       type: string
 *                       example: "Nguyen Van A"
 *                     phoneNumber:
 *                       type: string
 *                       example: "0123456789"
 *                     address:
 *                       type: object
 *                       properties:
 *                         country:
 *                           type: string
 *                           example: "Vietnam"
 *                         city:
 *                           type: string
 *                           example: "Hanoi"
 *                         district:
 *                           type: string
 *                           example: "Hoan Kiem"
 *                         addressLine:
 *                           type: string
 *                           example: "123 Đường ABC"
 *                     paymentMethod:
 *                       type: string
 *                       example: "vnpay"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product_id:
 *                             type: string
 *                             example: "60c72b1f9b1e8a001c5e5b3c"
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                     discount_id:
 *                       type: string
 *                       example: "5f6e8b8e0e7b0f001cc6e5d2"
 *                     totalAmount:
 *                       type: number
 *                       example: 100000
 *                     discountApplied:
 *                       type: number
 *                       example: 10000
 *                     finalAmount:
 *                       type: number
 *                       example: 90000
 *       400:
 *         description: Thông tin không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post("/create", paymentController.createPayment);

module.exports = router;

/*Khi người dùng chọn thanh toán qua VNPay và bấm nút "Đặt hàng" hoặc "Thanh toán," bạn cần thực hiện các bước sau để hoàn thiện luồng thanh toán qua VNPay:

Bước 1: Gửi Yêu Cầu Tạo URL Thanh Toán VNPay
Xác định thông tin thanh toán: Lấy các thông tin cần thiết từ người dùng, chẳng hạn như tổng số tiền thanh toán, mã đơn hàng, email, số điện thoại, địa chỉ giao hàng, và bất kỳ thông tin bổ sung nào cần thiết.
Tạo tham số yêu cầu: Tạo một yêu cầu chứa các tham số bắt buộc mà VNPay yêu cầu (ví dụ: vnp_Amount, vnp_OrderInfo, vnp_TxnRef).
Ký tham số: Sử dụng mã bí mật (secret key) từ VNPay để ký chuỗi yêu cầu của bạn, đảm bảo rằng nó được xác thực.
Gửi yêu cầu tới VNPay: Chuyển hướng người dùng tới trang thanh toán VNPay bằng cách cung cấp một URL đã tạo. Khi người dùng được chuyển tới VNPay, họ sẽ nhập thông tin thanh toán và xác nhận giao dịch.
Bước 2: Nhận Phản Hồi Từ VNPay
Xử lý phản hồi: Sau khi thanh toán hoàn tất, VNPay sẽ gửi người dùng trở lại URL callback của bạn (URL này bạn phải đăng ký trước với VNPay).
Xác thực dữ liệu: Kiểm tra chữ ký dữ liệu mà VNPay gửi về để đảm bảo rằng phản hồi là hợp lệ và không bị thay đổi.
Cập nhật trạng thái đơn hàng: Dựa trên phản hồi của VNPay, cập nhật trạng thái đơn hàng trong cơ sở dữ liệu của bạn (ví dụ: “Thanh toán thành công,” “Đang chờ thanh toán,” “Thất bại”).
Bước 3: Xác Nhận Hoàn Tất
Thông báo tới người dùng: Sau khi nhận phản hồi, hiển thị thông báo kết quả thanh toán (thành công/thất bại) cho người dùng. Đồng thời gửi email xác nhận nếu cần.
Xử lý giao hàng: Nếu thanh toán thành công, bắt đầu quy trình xử lý đơn hàng và giao hàng. 



Sau khi người dùng kiểm tra thông tin và bấm vào "Đặt hàng", bạn cần thực hiện các bước sau để gửi thông tin thanh toán xuống server và xử lý giao dịch:

Frontend - Gửi yêu cầu thanh toán:

Khi người dùng bấm "Đặt hàng", gửi yêu cầu POST đến endpoint xử lý thanh toán. Trong payload, bao gồm các thông tin:
User ID hoặc Email của người dùng để xác nhận danh tính.
Product details (bao gồm product_id và quantity cho từng sản phẩm).
Total amount sau khi áp dụng giảm giá.
Discount ID (nếu có).
Phương thức thanh toán (VD: VNPAY, COD, Bank Transfer).
Backend - Endpoint xử lý thanh toán:

Tạo một route trên server để nhận yêu cầu từ frontend. Ví dụ: /api/payments.
Trong hàm xử lý:
Xác thực thông tin người dùng: Kiểm tra email hoặc ID của người dùng.
Kiểm tra sản phẩm và số lượng: Xác nhận tất cả các sản phẩm có trong kho và đủ số lượng.
Tính toán tổng tiền: Xác nhận tổng tiền đã tính toán từ frontend có khớp với tổng tiền của các sản phẩm.
Gọi API của phương thức thanh toán:
Nếu là VNPAY, tạo link thanh toán VNPAY và trả về cho frontend để người dùng chuyển đến trang thanh toán của VNPAY.
Nếu là các phương thức khác như COD hoặc Bank Transfer, cập nhật trạng thái đơn hàng tương ứng.
Frontend - Xử lý kết quả thanh toán:

Nếu phương thức thanh toán là VNPAY, sau khi người dùng thanh toán thành công trên VNPAY, bạn cần có một endpoint callback để nhận phản hồi từ VNPAY về trạng thái thanh toán.
Cập nhật giao diện theo kết quả trả về từ server (thành công hay thất bại).
Backend - Xử lý kết quả và lưu đơn hàng:

Sau khi thanh toán thành công, lưu thông tin đơn hàng và cập nhật trạng thái thanh toán.
Gửi email hoặc thông báo cho người dùng về trạng thái đơn hàng.
*/