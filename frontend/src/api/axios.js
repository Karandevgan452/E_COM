import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-com-0w79.onrender.com/api", 
});

export default axiosInstance;
