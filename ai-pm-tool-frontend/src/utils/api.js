import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',  // Update this to your backend URL
});

// Authentication APIs
export const login = (data) => api.post('/auth/login', data);

// Task APIs
export const getTasks = () => api.get('/tasks');
export const createTask = (data) => api.post('/tasks', data);

// Project APIs
export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);

export default api;
