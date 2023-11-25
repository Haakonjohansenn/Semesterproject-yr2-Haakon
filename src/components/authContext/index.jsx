// authContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [credits, setCredits] = useState(JSON.parse(localStorage.getItem('credits')))
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'))

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCredits(credits);
    setAvatar(avatar);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('credits');
    localStorage.removeItem('avatar');
    setIsLoggedIn(false);
    setUser(null);
    setCredits(null);
    setAvatar(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, credits, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
