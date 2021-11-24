import React, { useState } from 'react';

interface IAuthContext {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export const AuthContext = React.createContext({
  isAuthenticated: false,
  onLogin: () => {},
  onLogout: () => {}
} as IAuthContext);

const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    setIsAuthenticated(true);
  };

  const logoutHandler = () => {
    setIsAuthenticated(false);
  };

  const contextValue = {
    isAuthenticated: isAuthenticated,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };
  return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContextProvider;