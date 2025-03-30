import axios from "axios";

const publicAxios = axios.create({
  baseURL: "http://localhost:3000/api-docs",
  headers: { "Content-Type": "application/json" },
});

export default publicAxios;
