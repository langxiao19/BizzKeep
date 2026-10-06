import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Shared configuration
import { theme } from './shared/config/theme';

// App routes
import AppRoutes from './routes';

/**
 * App - Root application component
 * 
 * Provides:
 * - ThemeProvider for MUI theming
 * - CssBaseline for consistent styling
 * - BrowserRouter for client-side routing
 * - AppRoutes for route definitions
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
