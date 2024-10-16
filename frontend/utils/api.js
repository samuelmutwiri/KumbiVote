import axios from 'axios';
import { getToken, setToken, removeToken } from './tokenStorage';
import { logError } from './errorLogger';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getToken('refreshToken');
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        const { accessToken } = response.data;
        setToken(accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        removeToken();
        logError(refreshError);
        return Promise.reject(refreshError);
      }
    }
    logError(error);
    return Promise.reject(error);
  }
);

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    const { accessToken, refreshToken } = response.data;
    setToken(accessToken);
    setToken(refreshToken, 'refreshToken');
    return response.data;
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const logout = () => {
  removeToken();
  removeToken('refreshToken');
};

export const authenticatedGet = (url: string, config = {}) => {
  return api.get(url, config);
};

export const authenticatedPost = (url: string, data: any, config = {}) => {
  return api.post(url, data, config);
};

export const unauthenticatedGet = (url: string, config = {}) => {
  return axios.get(`${API_URL}${url}`, config);
};

export const unauthenticatedPost = (url: string, data: any, config = {}) => {
  return axios.post(`${API_URL}${url}`, data, config);
};

//import axios from 'axios';
//import Cookies from 'js-cookie';
//import authService from '../services/authService';
//
//const api = axios.create({
//  baseURL: process.env.NEXT_PUBLIC_API_URL,
//  withCredentials: true, // This is important for handling cookies
//});
//
//api.interceptors.request.use(async (config) => {
//  // Add CSRF token to the request
//  const csrfToken = Cookies.get('csrftoken');
//  if (csrfToken) {
//    config.headers['X-CSRFToken'] = csrfToken;
//  }
//
//  // Add authentication token to the request
//  const token = await authService.getValidToken();
//  if (token) {
//    config.headers['Authorization'] = `Bearer ${token}`;
//  }
//
//  return config;
//});
//
//export default api;
