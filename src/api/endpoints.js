/**
 * Centralización de endpoints de la API
 * Facilita el mantenimiento y evita strings duplicados
 */

const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    GOOGLE: '/auth/google',
    GITHUB: '/auth/github',
  },

  // Users
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    STATS: '/users/stats',
  },

  // Database Instances
  INSTANCES: {
    BASE: '/instances',
    BY_ID: (id) => `/instances/${id}`,
    SUSPEND: (id) => `/instances/${id}/suspend`,
    RESUME: (id) => `/instances/${id}/resume`,
    DELETE: (id) => `/instances/${id}`,
    STATS: (id) => `/instances/${id}/stats`,
    LOGS: (id) => `/instances/${id}/logs`,
    BACKUP: (id) => `/instances/${id}/backup`,
    RESTORE: (id) => `/instances/${id}/restore`,
  },

  // Plans and Subscriptions
  PLANS: {
    BASE: '/plans',
    BY_ID: (id) => `/plans/${id}`,
    ACTIVE: '/plans/active',
    COMPARE: '/plans/compare',
  },

  SUBSCRIPTIONS: {
    BASE: '/subscriptions',
    CURRENT: '/subscriptions/current',
    UPGRADE: '/subscriptions/upgrade',
    DOWNGRADE: '/subscriptions/downgrade',
    CANCEL: '/subscriptions/cancel',
    HISTORY: '/subscriptions/history',
  },

  // Payments
  PAYMENTS: {
    BASE: '/payments',
    CREATE_PREFERENCE: '/payments/mercadopago/preference',
    WEBHOOK: '/payments/mercadopago/webhook',
    HISTORY: '/payments/history',
    BY_ID: (id) => `/payments/${id}`,
  },

  // Dashboard
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ACTIVITY: '/dashboard/activity',
    USAGE: '/dashboard/usage',
  },

  // Database Engines/Types
  ENGINES: {
    BASE: '/engines',
    BY_ID: (id) => `/engines/${id}`,
  },
};

export default ENDPOINTS;
