const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountCodeSchema = new Schema({
  name: {
    type: String,
    required: true, // Tên của mã giảm giá
  },
  condition: {
    type: Number,
    required: true, // Điều kiện áp dụng mã giảm giá
  },
  startDate: {
    type: Date,
    required: true, // Ngày bắt đầu áp dụng mã giảm giá
  },
  endDate: {
    type: Date,
    required: true, // Ngày kết thúc mã giảm giá
  },
  discountAmount: {
    type: Number,
    required: true, // Số tiền hoặc phần trăm giảm giá
  },
  discountType: {
    type: String,
    enum: ['percent', 'fixed'], // Kiểu giảm giá: phần trăm hoặc số tiền cố định
    required: true
  },
  quantity: {
    type: Number,
    required: true, // Số lượng mã giảm giá
    default: 0, // Giá trị mặc định là 0 nếu không nhập
  },
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

const DiscountCode = mongoose.model('DiscountCode', discountCodeSchema);

module.exports = DiscountCode;
