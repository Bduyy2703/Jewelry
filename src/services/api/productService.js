// productService.js
const API_BASE_URL = "http://localhost:3001/api"; // Thay đổi URL cho đúng

export const fetchProducts = async (limit, page) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/all?limit=${limit}&page=${page}`,
    );

    // Kiểm tra phản hồi từ API
    if (!response.ok) {
      throw new Error("Yêu cầu không hợp lệ");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error(error);
    return { error: error.message }; // Trả về thông báo lỗi
  }
};

export const searchProducts = async (keyword, limit, page) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/search?keyword=${encodeURIComponent(keyword)}&limit=${limit}&page=${page}`,
    );

    // Kiểm tra phản hồi từ API
    if (!response.ok) {
      throw new Error("Yêu cầu không hợp lệ");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error(error);
    return { error: error.message }; // Trả về thông báo lỗi
  }
};

export const getProductDetail = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/detail/${id}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
export const getSaleProducts = async (limit, page) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/sales?limit=${limit}&page=${page}`);

    // Kiểm tra phản hồi từ API
    if (!response.ok) {
      throw new Error('Yêu cầu không hợp lệ');
    }

    const data = await response.json();
    return data; // Trả về dữ liệu sản phẩm đang sale
  } catch (error) {
    console.error(error);
    return { error: error.message }; // Trả về thông báo lỗi
  }
};

