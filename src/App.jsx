import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/ui';
import AppRoutes from './routes';
import './styles/global.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
