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
    // Map engine names to database engine IDs (these should come from backend)
    const engineMap = {
      'MySQL': 1,
      'PostgreSQL': 2,
      'MongoDB': 3,
      'Redis': 4,
      'SQL Server': 5,
      'Cassandra': 6,
    };

    // Get user ID and subscription ID from localStorage (set during login/subscription)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const subscription = JSON.parse(localStorage.getItem('currentSubscription') || '{}');

    if (!user.userId) {
      throw new Error('User not authenticated');
    }

    if (!subscription.id) {
      throw new Error('No active subscription found. Please subscribe to a plan first.');
    }

    const response = await apiClient.post(ENDPOINTS.INSTANCES.BASE, {
      userId: user.userId,
      subscriptionId: subscription.id,
      databaseEngineId: engineMap[engine] || 1,
      instanceName: databaseName || null,
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
    let response;

    if (status === 'SUSPENDED') {
      response = await apiClient.put(ENDPOINTS.INSTANCES.SUSPEND(id));
    } else if (status === 'RUNNING') {
      response = await apiClient.put(ENDPOINTS.INSTANCES.RESUME(id));
    } else {
      throw new Error(`Unsupported status: ${status}`);
    }

    return response.data;
  },

  // Rotate password
  rotatePassword: async (id) => {
    const response = await apiClient.post(`${ENDPOINTS.INSTANCES.BY_ID(id)}/rotate-password`);
    return response.data;
  },
};

export default instanceService;
