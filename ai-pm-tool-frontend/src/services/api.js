// services/api.js

import axios from 'axios';

// Base URL for your API
const API_URL = 'http://localhost:5001/api'; // Adjust this to match your server URL

// Function to handle login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response;
  } catch (error) {
    throw error; // Forward the error for handling in the component
  }
};

// Function to get tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response;
  } catch (error) {
    throw error; // Forward the error for handling in the component
  }
};
