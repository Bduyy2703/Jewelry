// services/productService.js
const Product = require("../models/product.model");
const ProductDetail = require("../models/productDetail.model");
const Image = require("../models/image.model");
const Category = require("../models/category.model");
const cloudinaryService = require('../cloudinary/cloudinary.service');
const mongoose = require('mongoose')
const validateCategories = async (product_category) => {
  // Nếu product_category là một chuỗi, tách nó thành một mảng
  if (typeof product_category === 'string') {
    // Tách chuỗi thành mảng bằng dấu phẩy
    product_category = product_category.split(',').map(id => id.trim());
  }
  // Chuyển đổi các ID thành ObjectId
  product_category = product_category.map(id => new mongoose.Types.ObjectId(id));
  // Kiểm tra tất cả các ID trong một lần
  const categoryExistenceChecks = product_category.map(async (categoryId) => {
    // Kiểm tra xem ID có phải là chuỗi hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new Error(`Danh mục với ID "${categoryId}" không hợp lệ.`);
    }

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      throw new Error(`Danh mục với ID "${categoryId}" không tồn tại.`);
    }
  });
  // Chờ tất cả các kiểm tra hoàn thành
  await Promise.all(categoryExistenceChecks);
  return product_category;
};

const createProductDetail = async (productDetails, imageUrls) => {
  if (!productDetails) return null;

  // Lưu các hình ảnh vào database và lấy ObjectId của chúng
  const imageIds = await Promise.all(
    imageUrls.map(async (img) => {
      const newImage = new Image({
        asset_id: img.asset_id,
        public_id: img.public_id,
        format: img.format,
        resource_type: img.resource_type,
        secure_url: img.secure_url,
        original_filename: img.original_filename,
      });
      const savedImage = await newImage.save();
      return savedImage._id; // Trả về ID của hình ảnh đã lưu
    })
  );

  const newProductDetail = new ProductDetail({
    ...productDetails,
    product_images: imageIds, // Lưu ObjectId của hình ảnh
  });
  const savedProductDetail = await newProductDetail.save();
  return savedProductDetail._id; // Trả về ID của ProductDetail đã lưu
};
const createProduct = async (productData) => {
  try {

    const { product_details, productImages, product_category } = productData;
    // Kiểm tra sự tồn tại của tất cả các danh mục trong mảng
    const product_category_test = await validateCategories(product_category)

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
