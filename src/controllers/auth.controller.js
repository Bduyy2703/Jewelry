const authService = require('../services/auth.service');

const register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    const result = await authService.registerUser({ firstName, lastName, email, phoneNumber, password });
    res.status(201).json({ message: 'Tạo tài khoản thành công', user: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { register };
