import { apiClient } from '../api/client';
import ENDPOINTS from '../api/endpoints';

const subscriptionService = {
  // Get current subscription for user
  getCurrentSubscription: async (userId) => {
    const response = await apiClient.get(ENDPOINTS.SUBSCRIPTIONS.CURRENT, {
      params: { userId },
    });
    return response.data;
  },

  // Upgrade subscription to a new plan
  upgradeSubscription: async (userId, planId) => {
    const response = await apiClient.post(ENDPOINTS.SUBSCRIPTIONS.UPGRADE, {
      userId,
      planId,
    });
    return response.data;
  },

  // Get subscription by ID
  getSubscriptionById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.SUBSCRIPTIONS.BASE, {
      params: { id },
    });
    return response.data;
  },
};

export default subscriptionService;
