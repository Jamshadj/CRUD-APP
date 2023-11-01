import axios from "axios";

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.Authorization = token;
    }
    return request;
  });

  return instance;
};

export default axiosInstance;
