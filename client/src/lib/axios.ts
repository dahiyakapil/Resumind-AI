
// import axios from "axios";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const instance = axios.create({
//   baseURL: `${API_BASE_URL}`, 
//   withCredentials: true, 
// });

// export default instance;



// src/lib/axios.ts


import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ applied globally
});

export default axios;
