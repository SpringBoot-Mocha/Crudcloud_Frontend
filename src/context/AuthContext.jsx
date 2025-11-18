import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';
import subscriptionService from '../services/subscriptionService';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // TODO: Obtener suscripción cuando el método esté disponible
          // const subscriptionData = await subscriptionService.getCurrentSubscription(parsedUser.id);
          // setSubscription(subscriptionData);
        } catch (error) {
          console.error('Error al cargar datos de autenticación:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { token, user: userData } = await authService.login(email, password);
      setUser(userData);

      // TODO: Obtener suscripción
      // const subscriptionData = await subscriptionService.getCurrentSubscription(userData.id);
      // setSubscription(subscriptionData);

      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async (googleToken) => {
    try {
      const { token, user: userData } = await authService.loginWithGoogle(googleToken);
      setUser(userData);

      // TODO: Obtener suscripción
      // const subscriptionData = await subscriptionService.getCurrentSubscription(userData.id);
      // setSubscription(subscriptionData);

      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const loginWithGitHub = async (githubToken) => {
    try {
      const { token, user: userData } = await authService.loginWithGitHub(githubToken);
      setUser(userData);

      // TODO: Obtener suscripción
      // const subscriptionData = await subscriptionService.getCurrentSubscription(userData.id);
      // setSubscription(subscriptionData);

      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { token, user: newUser } = await authService.register(
        userData.email,
        userData.password,
        userData.firstName,
        userData.lastName
      );
      setUser(newUser);

      // TODO: Obtener suscripción
      // const subscriptionData = await subscriptionService.getCurrentSubscription(newUser.id);
      // setSubscription(subscriptionData);

      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setSubscription(null);
  };

  const value = {
    user,
    subscription,
    loading,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    loginWithGitHub,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};