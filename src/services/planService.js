import { apiClient } from '../api/client';
import ENDPOINTS from '../api/endpoints';

const planService = {
  // Get all available plans
  getPlans: async () => {
    const response = await apiClient.get(ENDPOINTS.PLANS.BASE);
    return response.data;
  },

  // Get single plan details
  getPlan: async (id) => {
    const response = await apiClient.get(ENDPOINTS.PLANS.BY_ID(id));
    return response.data;
  },

  // Get current subscription
  getCurrentSubscription: async () => {
    const response = await apiClient.get(ENDPOINTS.SUBSCRIPTIONS.CURRENT);
    return response.data;
  },

  // Upgrade to a plan (with automatic email notification)
  upgradePlan: async (userId, planId) => {
    const response = await apiClient.put(
      `${ENDPOINTS.SUBSCRIPTIONS.BASE}/${userId}/plan/${planId}`
    );
    return response.data;
  },
};

export default planService;
