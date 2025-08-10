import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ✅ Automatically attach JWT to every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
