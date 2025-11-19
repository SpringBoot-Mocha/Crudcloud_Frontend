import React, { createContext, useState, useCallback } from 'react';
import planService from '../services/planService';
import { useAuth } from './AuthContext';

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await planService.getPlans();
      setPlans(data);
    } catch (err) {
      setError(err.message || 'Error fetching plans');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCurrentSubscription = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await planService.getCurrentSubscription();
      setCurrentSubscription(data);
    } catch (err) {
      setError(err.message || 'Error fetching subscription');
    } finally {
      setLoading(false);
    }
  }, []);

  const upgradePlan = useCallback(async (planId) => {
    setLoading(true);
    setError(null);
    try {
      if (!user || !user.userId) {
        throw new Error('User not authenticated');
      }
      const result = await planService.upgradePlan(user.userId, planId);
      await fetchCurrentSubscription();
      return result;
    } catch (err) {
      setError(err.message || 'Error upgrading plan');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, fetchCurrentSubscription]);

  const value = {
    plans,
    currentSubscription,
    loading,
    error,
    fetchPlans,
    fetchCurrentSubscription,
    upgradePlan,
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
};
