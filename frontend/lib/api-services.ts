import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://dashboard-backend-b7ak.onrender.com/api',
  withCredentials: true,
});
