import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:3001/api"; // Đặt URL của API BE tại đây

export const verifyOTP = async (otpCode, q) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/verify-otp?q=${encodeURIComponent(q)}`,
      {
        otp: otpCode,
      }
    );
    return response.data;
  } catch (error) {
    console.log("123", error);
    throw new Error(error.response?.data?.message || "Xác minh OTP thất bại");
  }
};

export const register = async (data) => {
  try {
    console.log("123");
    const response = await axios.post(`${API_URL}/auth/register`, data);
    console.log("123");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng ký thất bại");
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    const accessToken = response.data.accessToken;
    console.log("Access Token:", accessToken);
    // Giải mã accessToken để lấy thông tin người dùng
    const decodedToken = jwtDecode(accessToken);
    console.log(decodedToken);

    // Lấy email từ decodedToken
    const userEmail = jwtDecode(accessToken).email;
    console.log("User email:", userEmail);
    return { accessToken, userEmail };
  } catch (error) {
    const errorMessage = error.response?.data || 'Có lỗi xảy ra, vui lòng thử lại!';
    console.error("Error:", errorMessage);
    throw new Error(errorMessage.error);
  }
};

export const requestOTP = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/request-otp`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Yêu cầu OTP thất bại");
  }
};



export const sendOTP = async (email) => {
  try {
    console.log("email", email);
    const response = await axios.post(`${API_URL}/auth/send-otp`, { email });
    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Yêu cầu OTP thất bại");
  }
};

export const forgotPassword = async (
  { otp, newPassword, confirmPassword },
  q
) => {
  console.log(otp, newPassword, confirmPassword, q);

  // const token = jwt.sign({ email }, 94vFo1lmQQ, { expiresIn: '5m' });
  try {
    const response = await axios.put(
      `${API_URL}/auth/reset-password?q=${encodeURIComponent(q)}`,
      {
        otp,
        newPassword,
        confirmPassword,
      }
    );

    return response.data; // Return the success message
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Đặt lại mật khẩu thất bại"
    );
  }
};
