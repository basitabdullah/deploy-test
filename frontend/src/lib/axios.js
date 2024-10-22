import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://meteor-ecom-final.onrender.com/api",
  withCredentials: true, // send cookies when cross-domain requests
});

export default axiosInstance;
    