// services/auth.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Django server URL

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/token/`, {
      email,
      password,
    });

    const { access, refresh } = response.data;

    // Store tokens in localStorage or cookies (or HttpOnly cookie for better security)
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

// Refresh the token
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });

    const { access } = response.data;
    localStorage.setItem('access_token', access);
    return access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

// Get access token
export const getAccessToken = () => localStorage.getItem('access_token');

// Logout user
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

