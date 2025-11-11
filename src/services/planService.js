// Servicio de planes

const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Obtener el plan del usuario
export const getUserPlan = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/plans/user`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { message: data.message || 'Error al obtener el plan' };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error de conexión',
      data: {
        // Datos de ejemplo
        name: 'FREE',
        maxInstances: 2,
        currentInstances: 0,
        price: 0
      }
    };
  }
};

// Obtener todos los planes disponibles
export const getAllPlans = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/plans`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { message: data.message || 'Error al obtener planes' };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error de conexión',
      data: [
        // Datos de ejemplo
        { id: 1, name: 'FREE', maxInstances: 2, price: 0 },
        { id: 2, name: 'BASIC', maxInstances: 5, price: 9.99 },
        { id: 3, name: 'PRO', maxInstances: 10, price: 19.99 }
      ]
    };
  }
};

// Mejorar plan (upgrade)
export const upgradePlan = async (planId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/plans/upgrade`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ planId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { message: data.message || 'Error al actualizar el plan' };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Error de conexión'
    };
  }
};
