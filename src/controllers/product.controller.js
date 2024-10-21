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

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id; // Lấy ID sản phẩm từ request params

    // Gọi hàm deleteProductById từ service để xóa sản phẩm
    const deletedProduct = await productService.deleteProductById(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Sản phẩm không được tìm thấy" });
    }

    res.status(200).json({
      message: "Sản phẩm đã được xóa thành công",
      data: {
        product: deletedProduct,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Lấy ID của sản phẩm từ URL params

    // Dữ liệu cập nhật từ request body
    const updatedProductData = {
      ...req.body,
      productImages: req.files, // Lấy các ảnh mới từ req.files nếu có
    };

    // Gọi hàm updateProduct từ service để cập nhật sản phẩm
    const updatedProduct = await productService.updateProduct(productId, updatedProductData);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Sản phẩm không được tìm thấy" });
    }

    res.status(200).json({
      message: "Sản phẩm đã được cập nhật thành công",
      data: {
        product: updatedProduct,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Hàm mới để lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
    const limit = parseInt(req.query.limit) || 16; // Số sản phẩm mỗi trang (mặc định là 10)
    console.log('page',page)
    const result = await productService.getAllProducts(page, limit);

    res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductDetailsById = async (req, res) => {
  try {
    const productId = req.params.id; // Lấy ID sản phẩm từ request params

    // Gọi hàm getProductById từ service để lấy thông tin sản phẩm
    const product = await productService.getProductDetailsById(productId);

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không được tìm thấy" });
    }

    res.status(200).json({
      message: "Lấy thông tin sản phẩm thành công",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra khi lấy thông tin sản phẩm." });
  }
};

module.exports = {
  createProduct,
  deleteProductById,
  updateProduct,
  getAllProducts, // Xuất hàm getAllProducts
  getProductDetailsById,
};