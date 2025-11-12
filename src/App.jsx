import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { InstanceProvider } from './context/InstanceContext';
import { PlanProvider } from './context/PlanContext';
import { ErrorBoundary } from './components/ui';
import { ScrollProgress } from './components/ui';
import AppRoutes from './routes';
import './styles/global.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <InstanceProvider>
            <PlanProvider>
              <ScrollProgress />
              <AppRoutes />
            </PlanProvider>
          </InstanceProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
