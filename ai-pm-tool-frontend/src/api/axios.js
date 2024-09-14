import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Replace with your backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
