const mongoose = require('mongoose');
const Role = require('./role.model'); // Thêm dòng này để kết nối với mô hình Role
const UserProfile = require('./profile.model');
// Định nghĩa mô hình User
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role', // Liên kết với mô hình Role
  }],
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
