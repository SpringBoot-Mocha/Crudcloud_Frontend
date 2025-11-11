import { apiClient } from '../api/client';

const planService = {
  // Get all available plans
  getPlans: async () => {
    const response = await apiClient.get('/api/v1/plans');
    return response.data;
  },

  // Get single plan details
  getPlan: async (id) => {
    const response = await apiClient.get(`/api/v1/plans/${id}`);
    return response.data;
  },

  // Get current subscription
  getCurrentSubscription: async () => {
    const response = await apiClient.get('/api/v1/subscriptions/current');
    return response.data;
  },

  // Upgrade to a plan
  upgradePlan: async (planId) => {
    const response = await apiClient.post('/api/v1/subscriptions/upgrade', {
      planId,
    });
    return response.data;
  },
};

export default planService;
