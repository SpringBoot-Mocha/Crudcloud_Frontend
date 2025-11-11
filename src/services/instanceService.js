import { apiClient } from '../api/client';

const instanceService = {
  // Get all instances for current user
  getInstances: async () => {
    const response = await apiClient.get('/api/v1/instances');
    return response.data;
  },

  // Get single instance details
  getInstance: async (id) => {
    const response = await apiClient.get(`/api/v1/instances/${id}`);
    return response.data;
  },

  // Create new instance
  createInstance: async (engine, databaseName = null) => {
    const response = await apiClient.post('/api/v1/instances', {
      engine,
      databaseName,
    });
    return response.data;
  },

  // Delete instance
  deleteInstance: async (id) => {
    const response = await apiClient.delete(`/api/v1/instances/${id}`);
    return response.data;
  },

  // Update instance status (suspend, resume, etc.)
  updateInstanceStatus: async (id, status) => {
    const response = await apiClient.put(`/api/v1/instances/${id}`, {
      status,
    });
    return response.data;
  },

  // Rotate password
  rotatePassword: async (id) => {
    const response = await apiClient.post(`/api/v1/instances/${id}/rotate-password`);
    return response.data;
  },
};

export default instanceService;
