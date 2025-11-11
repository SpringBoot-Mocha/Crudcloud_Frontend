// Simple validation helpers (sin Zod para mantenerlo lightweight)

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const fieldRules = rules[field];

    if (fieldRules.required && (!value || value.trim() === '')) {
      errors[field] = `${fieldRules.label || field} es requerido`;
      return;
    }

    if (value && fieldRules.type === 'email' && !validateEmail(value)) {
      errors[field] = `${fieldRules.label || field} debe ser un email válido`;
    }

    if (value && fieldRules.type === 'password' && !validatePassword(value)) {
      errors[field] = `${fieldRules.label || field} debe tener al menos 8 caracteres`;
    }

    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[field] = `${fieldRules.label || field} debe tener al menos ${fieldRules.minLength} caracteres`;
    }

    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      errors[field] = `${fieldRules.label || field} no puede exceder ${fieldRules.maxLength} caracteres`;
    }

    if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
      errors[field] = fieldRules.message || `${fieldRules.label || field} tiene un formato inválido`;
    }
  });

  return errors;
};

// Esquemas de validación
export const loginSchema = {
  email: { required: true, type: 'email', label: 'Email' },
  password: { required: true, type: 'password', label: 'Contraseña' },
};

export const registerSchema = {
  firstName: { required: false, label: 'Nombre' },
  lastName: { required: false, label: 'Apellido' },
  email: { required: true, type: 'email', label: 'Email' },
  password: { required: true, type: 'password', label: 'Contraseña' },
};

export const profileSchema = {
  firstName: { required: true, label: 'Nombre' },
  lastName: { required: true, label: 'Apellido' },
};

export const passwordChangeSchema = {
  currentPassword: { required: true, type: 'password', label: 'Contraseña Actual' },
  newPassword: { required: true, type: 'password', label: 'Nueva Contraseña' },
  confirmPassword: { required: true, type: 'password', label: 'Confirmar Contraseña' },
};
