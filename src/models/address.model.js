const mongoose = require('mongoose');

// Định nghĩa mô hình Address
const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
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
  ward: {
    type: String,
    required: true,
  },
  addressLine: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
