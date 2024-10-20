// controllers/product.controller.js
const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    // Dữ liệu từ request body
    const productData = {
      ...req.body,
      productImages: req.files, // Lấy các ảnh từ req.files (do sử dụng multer cho việc upload)
    };
    console.log(req.files)
    const product = await productService.createProduct(productData);

    // Định dạng phản hồi
    res.status(201).json({
      message: "Sản phẩm đã được tạo thành công",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
};
