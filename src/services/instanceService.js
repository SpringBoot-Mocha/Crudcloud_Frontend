import { apiClient } from '../api/client';
import ENDPOINTS from '../api/endpoints';

const instanceService = {
  // Get all instances for current user
  getInstances: async () => {
    const response = await apiClient.get(ENDPOINTS.INSTANCES.BASE);
    return response.data;
  },

  // Get single instance details
  getInstance: async (id) => {
    const response = await apiClient.get(ENDPOINTS.INSTANCES.BY_ID(id));
    return response.data;
  },

  // Create new instance
  createInstance: async (engine, databaseName = null) => {
    const response = await apiClient.post(ENDPOINTS.INSTANCES.BASE, {
      engine,
      databaseName,
    });
    return response.data;
  },

  // Delete instance
  deleteInstance: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.INSTANCES.DELETE(id));
    return response.data;
  },

  // Update instance status (suspend, resume, etc.)
  updateInstanceStatus: async (id, status) => {
    const response = await apiClient.put(ENDPOINTS.INSTANCES.BY_ID(id), {
      status,
    });
    return response.data;
  },

  // Rotate password
  rotatePassword: async (id) => {
    const response = await apiClient.post(`${ENDPOINTS.INSTANCES.BY_ID(id)}/rotate-password`);
    return response.data;
  },
};

export default instanceService;
