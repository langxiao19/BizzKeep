import { useState, useEffect, useCallback } from 'react';

interface User {
  name: string;
  email?: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export const useAuth = (): AuthState & {
  login: (token: string, user: User) => void;
  logout: () => void;
} => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem('restaurant_token');
    const userStr = localStorage.getItem('restaurant_user');
    
    let user: User | null = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    
    return {
      isAuthenticated: !!token,
      user,
      token,
    };
  });

  const login = useCallback((token: string, user: User) => {
    localStorage.setItem('restaurant_token', token);
    localStorage.setItem('restaurant_user', JSON.stringify(user));
    setAuthState({
      isAuthenticated: true,
      user,
      token,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('restaurant_token');
    localStorage.removeItem('restaurant_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  }, []);

  // Listen for storage changes (for multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'restaurant_token' || e.key === 'restaurant_user') {
        const token = localStorage.getItem('restaurant_token');
        const userStr = localStorage.getItem('restaurant_user');
        
        let user: User | null = null;
        if (userStr) {
          try {
            user = JSON.parse(userStr);
          } catch (err) {
            console.error('Error parsing user data:', err);
          }
        }
        
        setAuthState({
          isAuthenticated: !!token,
          user,
          token,
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    ...authState,
    login,
    logout,
  };
};

export default useAuth;

