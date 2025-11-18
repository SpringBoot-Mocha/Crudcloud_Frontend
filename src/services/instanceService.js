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
    // Map engine names to database engine IDs (matching backend database_engine table)
    // Order from DataLoader: PostgreSQL 14 (1), PostgreSQL 15 (2), PostgreSQL 16 (3),
    // MySQL 8.0 (4), MongoDB 6.0 (5), Redis 7.0 (6), SQL Server 2022 (7), Cassandra 4.1 (8)
    const engineMap = {
      'PostgreSQL': 2,    // PostgreSQL 15 - recommended stable version
      'MySQL': 4,         // MySQL 8.0
      'MongoDB': 5,       // MongoDB 6.0
      'Redis': 6,         // Redis 7.0
      'SQL Server': 7,    // SQL Server 2022
      'Cassandra': 8,     // Cassandra 4.1
    };

    // Get subscription ID from localStorage (userId is extracted from JWT by backend)
    const subscription = JSON.parse(localStorage.getItem('currentSubscription') || '{}');

    if (!subscription.id) {
      throw new Error('No active subscription found. Please subscribe to a plan first.');
    }

    // Note: userId is NOT sent in the request body anymore (Phase 4 change)
    // The backend extracts it from the JWT token in the Authorization header
    const response = await apiClient.post(ENDPOINTS.INSTANCES.BASE, {
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
