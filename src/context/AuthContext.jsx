import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    console.log('Checking stored auth:', { token: !!token, userData }); // Debug log
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Parsed user:', parsedUser); // Debug log
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear corrupted data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    console.log('Login called with:', { token: !!token, userData }); // Debug log
    
    // Validate inputs
    if (!token || !userData) {
      console.error('Invalid login data:', { token, userData });
      return;
    }
    
    try {
      // Ensure userData is an object
      const userToStore = typeof userData === 'string' ? JSON.parse(userData) : userData;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);
      
      console.log('Login successful, user stored:', userToStore); // Debug log
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
