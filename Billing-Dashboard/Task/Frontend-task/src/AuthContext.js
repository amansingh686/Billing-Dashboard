import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    
  const apipath = "http://localhost:4000/api/v1";

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const adminLogout = () => {
    localStorage.removeItem('admintoken');
    localStorage.removeItem('adminname');
    localStorage.removeItem('adminId');
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, apipath, login, logout, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
