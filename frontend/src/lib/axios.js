import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://frontend-seven-gray-76.vercel.app/api",//temp
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
