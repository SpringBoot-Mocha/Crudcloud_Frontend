import React, { createContext, useState, useCallback } from 'react';
import instanceService from '../services/instanceService';

export const InstanceContext = createContext();

export const InstanceProvider = ({ children }) => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstances = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await instanceService.getInstances();
      setInstances(data);
    } catch (err) {
      setError(err.message || 'Error fetching instances');
      setInstances([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createInstance = useCallback(async (engine, databaseName) => {
    setLoading(true);
    setError(null);
    try {
      const newInstance = await instanceService.createInstance(engine, databaseName);
      setInstances((prev) => [...prev, newInstance]);
      return newInstance;
    } catch (err) {
      setError(err.message || 'Error creating instance');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteInstance = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await instanceService.deleteInstance(id);
      setInstances((prev) => prev.filter((inst) => inst.id !== id));
    } catch (err) {
      setError(err.message || 'Error deleting instance');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateInstanceStatus = useCallback(async (id, status) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await instanceService.updateInstanceStatus(id, status);
      setInstances((prev) =>
        prev.map((inst) => (inst.id === id ? updated : inst))
      );
      return updated;
    } catch (err) {
      setError(err.message || 'Error updating instance');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const rotatePassword = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await instanceService.rotatePassword(id);
      setInstances((prev) =>
        prev.map((inst) => (inst.id === id ? updated : inst))
      );
      return updated;
    } catch (err) {
      setError(err.message || 'Error rotating password');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper method to count active instances (RUNNING or PENDING)
  const getActiveInstanceCount = useCallback(() => {
    return instances.filter(
      (inst) => inst.status === 'RUNNING' || inst.status === 'PENDING'
    ).length;
  }, [instances]);

  const value = {
    instances,
    loading,
    error,
    fetchInstances,
    createInstance,
    deleteInstance,
    updateInstanceStatus,
    rotatePassword,
    getActiveInstanceCount,
  };

  return (
    <InstanceContext.Provider value={value}>
      {children}
    </InstanceContext.Provider>
  );
};
