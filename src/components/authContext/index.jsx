import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [credits, setCredits] = useState(Number(localStorage.getItem('credits')) || 0);
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('credits', credits);
    localStorage.setItem('avatar', avatar);
  }, [user, credits, avatar]);

  const updateCredits = (newCredits) => {
    const parsedCredits = Number(newCredits);
    console.log("Setting credits to:", parsedCredits);
    localStorage.setItem("credits", parsedCredits);
    setCredits(parsedCredits);
  };

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCredits(Number(userData.credits));
    setAvatar(userData.avatar);
  };

  const updateAvatar = (newAvatar) => {
    localStorage.setItem("avatar", newAvatar);
    setAvatar(newAvatar);
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
    <AuthContext.Provider value={{ isLoggedIn, user, credits, avatar, login, logout, updateCredits, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
