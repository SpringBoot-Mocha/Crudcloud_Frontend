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

  // Upgrade to a plan
  upgradePlan: async (planId) => {
    const response = await apiClient.post(ENDPOINTS.SUBSCRIPTIONS.UPGRADE, {
      planId,
    });
    return response.data;
  },
};

export default planService;
