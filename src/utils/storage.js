// Token Management
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const clearToken = () => {
  localStorage.removeItem('token');
};

// User Management
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem('user');
};

// Combined Auth Clear
export const clearAuth = () => {
  clearToken();
  clearUser();
};
