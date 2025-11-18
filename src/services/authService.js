import { apiClient } from '../api/client';
import ENDPOINTS from '../api/endpoints';

const authService = {
  register: async (email, password, firstName = '', lastName = '') => {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, {
      email,
      password,
      firstName,
      lastName,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
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

  loginWithGoogle: async (googleToken) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.GOOGLE, {
      token: googleToken,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  loginWithGitHub: async (githubToken) => {
    console.log('🔐 authService.loginWithGitHub llamado');
    console.log('🔑 GitHub Token:', githubToken);
    console.log('📍 Endpoint:', ENDPOINTS.AUTH.GITHUB);
    
    const response = await apiClient.post(ENDPOINTS.AUTH.GITHUB, {
      token: githubToken,
    });
    
    console.log('📨 Respuesta del backend:', response.data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('✅ Token y usuario guardados en localStorage');
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
