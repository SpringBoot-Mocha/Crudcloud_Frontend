import { apiClient } from '../api/client';
import ENDPOINTS from '../api/endpoints';

const authService = {
  register: async (email, password, firstName = '', lastName = '') => {
    const name = `${firstName} ${lastName}`.trim();
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, {
      email,
      password,
      name,
      isOrganization: false,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
