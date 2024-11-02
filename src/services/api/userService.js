import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:3001/api"; 

export const getUserProfile = async (email) => {
    try {
      const response = await axios.get(`${API_URL}/users/profiles/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const changePassword = async (email, oldPassword, newPassword, confirmNewPassword) => {
  try {
    console.log(email);
      console.log(oldPassword);
      console.log(newPassword);
      console.log(confirmNewPassword);
    const response = await axios.put(`${API_URL}/users/change-password/${email}`, {
      oldPassword,
      newPassword,
      confirmNewPassword
    });

    console.log("Thông báo:", response.data.message);
    return response.data.message;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!';
    console.error("Lỗi:", errorMessage);
    throw new Error(errorMessage);
  }
};
