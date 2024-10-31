import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://meteor-ecom-mern.onrender.com/api",//temp
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
