"use strict";

const mongoose = require("mongoose");

// Định nghĩa mô hình Role
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Loại bỏ khoảng trắng ở đầu và cuối
      enum: ["ADMIN", "USER"], // Giới hạn các giá trị cho trường này
    },
    role_description: {
      type: String,
      trim: true,
      default: "", // Mô tả vai trò mặc định là chuỗi rỗng
    },
  },
  {
    timestamps: true, // Tạo trường createdAt và updatedAt
  }
);

// Tạo mô hình Role
const Role = mongoose.model("Role", roleSchema);

// Xuất mô hình
module.exports = Role;
