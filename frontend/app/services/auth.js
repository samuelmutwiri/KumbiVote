import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Backend server URL

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/token/`, {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;

    // Store tokens in localStorage or cookies (or HttpOnly cookie for better security)
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

// Refresh the token
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });

    const { access } = response.data;
    localStorage.setItem('accessToken', access);
    return access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

// Get access token
export const getAccessToken = () => localStorage.getItem('accessToken');

// Logout user
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

