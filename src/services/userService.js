import { apiClient } from '../api/client';

const userService = {
  // Get user profile
  getUser: async (id) => {
    const response = await apiClient.get(`/api/v1/users/${id}`);
    return response.data;
  },

  // Update user profile
  updateUser: async (id, data) => {
    const response = await apiClient.put(`/api/v1/users/${id}`, data);
    return response.data;
  },

  // Change password
  changePassword: async (id, currentPassword, newPassword) => {
    const response = await apiClient.post(`/api/v1/users/${id}/change-password`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  // Delete account
  deleteAccount: async (id) => {
    const response = await apiClient.delete(`/api/v1/users/${id}`);
    return response.data;
  },
};

export default userService;
