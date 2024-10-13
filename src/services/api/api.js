import axiosClient from "./axiosClient";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
// import jwt from 'jsonwebtoken';

export const fetchAllUser = () => {
    // return axios.get("/api/users?page=1");
    return axios.get("https://reqres.in/api/users?page=1");
}

export const login = async (email, password) => {
    try {
        const response = await axiosClient.post('/auth/login', {
            email,
            password
        });
      //test giải mã Token
      const accessToken = response.accessToken;
      console.log("Access Token:", accessToken);
      // Giải mã accessToken để lấy thông tin người dùng
      const decodedToken = jwtDecode(accessToken);
      console.log(decodedToken);
  
      // Lấy email từ decodedToken
      const userEmail = jwtDecode(accessToken).email;
      console.log("User email:", userEmail);
      return { accessToken, userEmail };
    } catch (error) {
      throw error;
    }
  };

export const getUserProfile = async (email) => {
  try {
    const response = await axiosClient.get(`/users/profiles/${email}`, {
    });
    return response;
  } catch (error) {
    throw error;
  }
};