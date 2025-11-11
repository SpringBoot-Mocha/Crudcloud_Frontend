import axios from 'axios';
import { getToken, clearAuth } from '../utils/storage';

// Configuración base del cliente API
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Agregar JWT token a cada request
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log en desarrollo
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Manejo centralizado de errores
apiClient.interceptors.response.use(
  (response) => {
    // Log en desarrollo
    if (import.meta.env.DEV) {
      console.log(`[API] Response:`, response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log en desarrollo
    if (import.meta.env.DEV) {
      console.error('[API] Error:', error.response?.data || error.message);
    }

    // Manejo de errores 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Limpiar auth y redirigir al login
      clearAuth();
      window.location.href = '/login';

      return Promise.reject(error);
    }

    // Manejo de errores 403 Forbidden
    if (error.response?.status === 403) {
      // Usuario no tiene permisos
      return Promise.reject({
        ...error,
        message: 'No tienes permisos para realizar esta acción',
      });
    }

    // Manejo de errores 404 Not Found
    if (error.response?.status === 404) {
      return Promise.reject({
        ...error,
        message: 'Recurso no encontrado',
      });
    }

    // Manejo de errores 429 Too Many Requests
    if (error.response?.status === 429) {
      return Promise.reject({
        ...error,
        message: 'Demasiadas solicitudes. Por favor, intenta más tarde.',
      });
    }

    // Manejo de errores 500 Server Error
    if (error.response?.status >= 500) {
      return Promise.reject({
        ...error,
        message: 'Error del servidor. Por favor, intenta más tarde.',
      });
    }

    // Manejo de errores de red
    if (error.message === 'Network Error') {
      return Promise.reject({
        ...error,
        message: 'Error de conexión. Verifica tu conexión a internet.',
      });
    }

    // Manejo de timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        ...error,
        message: 'La solicitud ha tardado demasiado. Por favor, intenta nuevamente.',
      });
    }

    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
