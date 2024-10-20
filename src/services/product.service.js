// services/productService.js
const Product = require("../models/product.model");
const ProductDetail = require("../models/productDetail.model");
const Image = require("../models/image.model");
const Category = require("../models/category.model");
const cloudinaryService = require('../cloudinary/cloudinary.service');
const mongoose = require('mongoose')
const validateCategory = async (categoryId) => {
  // Kiểm tra nếu categoryId là một ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new Error(`Danh mục với ID "${categoryId}" không hợp lệ.`);
  }

  // Kiểm tra sự tồn tại của danh mục
  const categoryExists = await Category.findById(categoryId);
  if (!categoryExists) {
    throw new Error(`Danh mục với ID "${categoryId}" không tồn tại.`);
  }

  return categoryId;
};
const createProductDetail = async (productDetails, imageUrls) => {
  if (!productDetails) return null;
  if (typeof productDetails === 'string') {
    try {
      productDetails = JSON.parse(productDetails);
    } catch (error) {
      throw new Error('productDetails không phải là một chuỗi JSON hợp lệ');
    }
  }
  // Lưu các hình ảnh vào database và lấy ObjectId của chúng
  const imageIds = await Promise.all(
    imageUrls.map(async (img) => {
      const newImage = new Image({
        asset_id: img.asset_id,
        public_id: img.public_id,
        format: img.format,
        resource_type: img.resource_type,
        secure_url: img.url,
        original_filename: img.original_filename,
      });
      const savedImage = await newImage.save();
      return savedImage._id; // Trả về ID của hình ảnh đã lưu
    })
  );
  const newProductDetail = new ProductDetail({
    material: productDetails.material, // "Vàng 24k"
    color: productDetails.color,       // "Vàng"
    length: productDetails.length,     // "40cm + 5cm"
    care_instructions: productDetails.care_instructions, // "Tránh tiếp xúc với hóa chất"
    stone_size: productDetails.stone_size, // "5mm"
    stone_type: productDetails.stone_type, // "Đá quý tự nhiên"
    design_style: productDetails.design_style, // "Cổ điển"
    product_images: imageIds, // Lưu ObjectId của hình ảnh
  });
  const savedProductDetail = await newProductDetail.save();
  return savedProductDetail._id; // Trả về ID của ProductDetail đã lưu
};
const createProduct = async (productData) => {
  try {

    const { product_details, productImages, product_category } = productData;
    // Kiểm tra sự tồn tại của tất cả các danh mục trong mảng
    const product_category_test = await validateCategory(product_category)

    // Upload ảnh lên Cloudinary
    const imageUrls = productImages ? await cloudinaryService.uploadToCloudinary(productImages) : [];

    // Tạo ProductDetail
    const productDetailId = await createProductDetail(product_details, imageUrls);

    // Tạo sản phẩm mới với ProductDetail và các danh mục đã chọn
    const newProduct = new Product({
      ...productData,
      product_details: productDetailId,
      product_category: product_category_test,
    });

    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};
module.exports = {
  createProduct,
};
