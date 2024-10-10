const mongoose = require('mongoose');
const Address = require('./address.model'); // Kết nối với mô hình Address

const profileSchema = new mongoose.Schema({
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
  addresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Address, // Liên kết với mô hình Address
  }],
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
