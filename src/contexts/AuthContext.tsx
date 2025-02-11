import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Dummy user credentials
const VALID_CREDENTIALS = {
  email: 'dirolabs@gmail.com',
  password: 'Diro@123',
};

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const lastActivity = localStorage.getItem('lastActivity');
    
    if (storedAuth === 'true' && lastActivity) {
      const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
      return timeSinceLastActivity < SESSION_TIMEOUT;
    }
    return false;
  });

  const navigate = useNavigate();

  const updateLastActivity = () => {
    localStorage.setItem('lastActivity', Date.now().toString());
  };

  const checkSession = () => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
      const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
      if (timeSinceLastActivity > SESSION_TIMEOUT) {
        logout();
      }
    }
  };

  useEffect(() => {
    // Set up activity listeners
    const handleActivity = () => {
      if (isAuthenticated) {
        updateLastActivity();
      }
    };

    // Update last activity on any user interaction
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    // Check session every minute
    const sessionCheck = setInterval(checkSession, 60000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearInterval(sessionCheck);
    };
  }, [isAuthenticated]);

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, always authenticate
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      updateLastActivity();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('lastActivity');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 