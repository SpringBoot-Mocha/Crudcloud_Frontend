import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { InstanceProvider } from './context/InstanceContext';
import { ErrorBoundary } from './components/ui';
import AppRoutes from './routes';
import './styles/global.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <InstanceProvider>
          <AppRoutes />
        </InstanceProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
