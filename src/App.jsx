import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { InstanceProvider } from './context/InstanceContext';
import { PlanProvider } from './context/PlanContext';
import { ErrorBoundary } from './components/ui';
import AppRoutes from './routes';
import './styles/global.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <InstanceProvider>
          <PlanProvider>
            <AppRoutes />
          </PlanProvider>
        </InstanceProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
