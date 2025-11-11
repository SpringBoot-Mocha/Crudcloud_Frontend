// Servicio de autenticación

const API_BASE_URL = 'http://localhost:8080/api';

// Registrar usuario
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error en el registro',
        errors: data.errors || [data.message || 'Error desconocido']
      };
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    if (error.status) {
      return {
        success: false,
        message: error.message,
        errors: error.errors
      };
    }
    return {
      success: false,
      message: 'Error de conexión con el servidor',
      errors: ['No se pudo conectar con el servidor']
    };
  }
};

// Iniciar sesión
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Error en el login',
        errors: data.errors || [data.message || 'Credenciales inválidas']
      };
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    if (error.status) {
      return {
        success: false,
        message: error.message,
        errors: error.errors
      };
    }
    return {
      success: false,
      message: 'Error de conexión',
      errors: ['No se pudo conectar con el servidor']
    };
  }
};

// Verificar estado de la API
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
};
