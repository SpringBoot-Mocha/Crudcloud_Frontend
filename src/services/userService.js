import { apiClient } from '../api/client';
import ENDPOINTS from '../api/endpoints';

const userService = {
  // Get user profile
  getUser: async (id) => {
    const response = await apiClient.get(`${ENDPOINTS.USERS.BASE}/${id}`);
    return response.data;
  },

  // Update user profile
  updateUser: async (id, data) => {
    const response = await apiClient.put(`${ENDPOINTS.USERS.BASE}/${id}`, data);
    return response.data;
  },

  // Change password
  changePassword: async (id, currentPassword, newPassword) => {
    const response = await apiClient.post(`${ENDPOINTS.USERS.BASE}/${id}/change-password`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  // Delete account
  deleteAccount: async (id) => {
    const response = await apiClient.delete(`${ENDPOINTS.USERS.BASE}/${id}`);
    return response.data;
  },
};

export default userService;
