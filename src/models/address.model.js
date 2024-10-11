const mongoose = require('mongoose');

// Định nghĩa mô hình Address
const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  addressLine: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
