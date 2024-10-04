// middlewares/setRole.js
const Role = require('../models/role.model');

const setRole = async (req, res, next) => {
  try {
    // Tìm vai trò mặc định cho người dùng
    let role = await Role.findOne({ name: "USER" });
    console.log("Role found:", role);

    // Nếu không tìm thấy vai trò USER, hãy tạo vai trò đó
    if (!role) {
      console.log("Role 'USER' not found. Creating default role.");
      role = await Role.create({ name: "USER" }); // Tạo vai trò mặc định
    }

    req.roleId = role._id; // Lưu ID vai trò vào request
    next();
  } catch (error) {
    console.error("Error in setRole middleware:", error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

module.exports = setRole;
