import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Shared
import AppShell from './shared/layouts/AppShell';
import ProtectedRoute from './shared/layouts/ProtectedRoute';

// Landing feature (public sites)
import LandingPage from './sites/bizkeeperLandingPage/Landing';
import LoginPage from './sites/bizkeeperLandingPage/Login';
import JoinPage from './sites/bizkeeperLandingPage/Join';
import SearchPage from './sites/bizkeeperLandingPage/Search';

// DigitalCafe feature (public restaurant site)
import DigitalCafeHome from './sites/digitalCafe/pages/Home';
import DigitalCafeMenu from './sites/digitalCafe/pages/Menu';
import DigitalCafeBlog from './sites/digitalCafe/pages/Blog';
import DigitalCafeBlogPost from './sites/digitalCafe/pages/BlogPost';

// Website Management (admin)
import Website from './workplace/website/Website';

// Home feature (app)
import Home from './workplace/Home';

// Customers feature (app)
import CustomerPage from './workplace/customer/Customer';

// Agents (app)
import BizkeeperPage from './bizkeeper/Bizkeeper';
import Publisher from './bizkeeper/publisher/Publisher';
import Messenger from './bizkeeper/messenger/Messenger';
import Scheduler from './bizkeeper/scheduler/Scheduler';

// Profile feature (app)
import Profile from './workplace/Profile';

/**
 * AppRoutes - Main routing configuration
 * 
 * Route Structure:
 * - Public site routes: /, /login, /join, /search, /digitalcafe/*
 * - Protected routes: /app/* (wrapped with AppShell + ProtectedRoute)
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ============================================
          PUBLIC SITE ROUTES
          ============================================ */}
      
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/search" element={<SearchPage />} />
      
      {/* Public Restaurant Website (DigitalCafe feature) */}
      <Route path="/digitalcafe" element={<DigitalCafeHome />} />
      <Route path="/digitalcafe/menu" element={<DigitalCafeMenu />} />
      <Route path="/digitalcafe/blog" element={<DigitalCafeBlog />} />
      <Route path="/digitalcafe/blog/:id" element={<DigitalCafeBlogPost />} />
      
      {/* Legacy route redirects */}
      <Route path="/landing" element={<Navigate to="/" replace />} />
      <Route path="/business" element={<Navigate to="/digitalcafe" replace />} />
      <Route path="/business/menu" element={<Navigate to="/digitalcafe/menu" replace />} />
      <Route path="/business/blog" element={<Navigate to="/digitalcafe/blog" replace />} />
      <Route path="/business/blog/:id" element={<Navigate to="/digitalcafe/blog/:id" replace />} />
      <Route path="/restaurant" element={<Navigate to="/digitalcafe" replace />} />
      <Route path="/restaurant/menu" element={<Navigate to="/digitalcafe/menu" replace />} />
      <Route path="/restaurant/blog" element={<Navigate to="/digitalcafe/blog" replace />} />
      <Route path="/restaurant/blog/:id" element={<Navigate to="/digitalcafe/blog/:id" replace />} />
      
      {/* ============================================
          PROTECTED ROUTES (App Shell)
          ============================================ */}
      
      {/* Home */}
      <Route
        path="/app/home"
        element={
          <ProtectedRoute>
            <AppShell>
              <Home />
            </AppShell>
          </ProtectedRoute>
        }
      />
      
      {/* Website Management - Core shell with feature modules: editor, menu, blog, booking, settings */}
      <Route
        path="/app/website"
        element={
          <ProtectedRoute>
            <AppShell>
              <Website />
            </AppShell>
          </ProtectedRoute>
        }
      />
      
      {/* Customers */}
      <Route
        path="/app/customers"
        element={
          <ProtectedRoute>
            <AppShell>
              <CustomerPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route path="/app/crm/customers" element={<Navigate to="/app/customers" replace />} />
      
      {/* Keeper */}
      <Route
        path="/app/keeper"
        element={
          <ProtectedRoute>
            <AppShell>
              <BizkeeperPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      
      {/* Agent Pages */}
      <Route
        path="/app/keeper/publisher"
        element={
          <ProtectedRoute>
            <AppShell>
              <Publisher />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/keeper/messenger"
        element={
          <ProtectedRoute>
            <AppShell>
              <Messenger />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/keeper/scheduler"
        element={
          <ProtectedRoute>
            <AppShell>
              <Scheduler />
            </AppShell>
          </ProtectedRoute>
        }
      />
      
      {/* Profile */}
      <Route
        path="/app/profile"
        element={
          <ProtectedRoute>
            <AppShell>
              <Profile />
            </AppShell>
          </ProtectedRoute>
        }
      />
      
      {/* ============================================
          LEGACY ROUTE REDIRECTS
          ============================================ */}
      
      {/* Old dashboard route */}
      <Route path="/dashboard" element={<Navigate to="/app/home" replace />} />
      
      {/* Old CRM routes */}
      <Route path="/customers" element={<Navigate to="/app/customers" replace />} />
      
      {/* Old keeper routes */}
      <Route path="/bizkeeper" element={<Navigate to="/app/keeper" replace />} />
      
      {/* Old profile route */}
      <Route path="/profile" element={<Navigate to="/app/profile" replace />} />
      
      {/* App root redirects to home */}
      <Route path="/app" element={<Navigate to="/app/home" replace />} />
      
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

