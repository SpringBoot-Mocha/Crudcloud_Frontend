import { apiClient } from '../api/client';

const authService = {
  register: async (email, password, firstName = '', lastName = '') => {
    const response = await apiClient.post('/api/v1/auth/register', {
      email,
      password,
      firstName,
      lastName,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/api/v1/auth/login', {
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
