import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authService = {
  async login(username, password) {
    const response = await axios.post(`${API_URL}/token/`, { username, password });
    if (response.data.access) {
      this.setTokens(response.data.access, response.data.refresh);
      return response.data;
    }
    throw new Error('Login failed');
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  setTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  getAccessToken() {
    return localStorage.getItem('accessToken');
  },

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  },

  isTokenExpired(token) {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 < Date.now();
  },

  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    try {
      const response = await axios.post(`${API_URL}/token/refresh/`, {
        refresh: refreshToken
      });
      this.setTokens(response.data.access, response.data.refresh);
      return response.data.access;
    } catch (error) {
      this.logout();
      throw new Error('Token refresh failed');
    }
  },

  async getValidToken() {
    const accessToken = this.getAccessToken();
    if (!accessToken || this.isTokenExpired(accessToken)) {
      return await this.refreshToken();
    }
    return accessToken;
  }
};

export default authService;
