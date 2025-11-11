import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import { ProtectedRoute } from '../components/auth';

// Placeholder pages (crearemos después)
const LandingPage = () => <PublicLayout><div className="text-center py-20"><h1>Landing Page - Próximamente</h1></div></PublicLayout>;
const PricingPage = () => <PublicLayout><div className="text-center py-20"><h1>Pricing Page - Próximamente</h1></div></PublicLayout>;
const AboutPage = () => <PublicLayout><div className="text-center py-20"><h1>About Page - Próximamente</h1></div></PublicLayout>;
const DashboardPage = () => <DashboardLayout><div><h1>Dashboard Page - Próximamente</h1></div></DashboardLayout>;
const InstancesPage = () => <DashboardLayout><div><h1>Instances Page - Próximamente</h1></div></DashboardLayout>;
const PlansPage = () => <DashboardLayout><div><h1>Plans Page - Próximamente</h1></div></DashboardLayout>;
const ProfilePage = () => <DashboardLayout><div><h1>Profile Page - Próximamente</h1></div></DashboardLayout>;

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instances"
          element={
            <ProtectedRoute>
              <InstancesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <PlansPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
