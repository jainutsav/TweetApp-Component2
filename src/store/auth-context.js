import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  doRefresh: false,
  onLogout: () => { },
  onLogin: (userLogin) => { }
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doRefresh, setDoRefresh] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    console.log(userToken)
    if (userToken !== null) {
      setIsLoggedIn(true)
      setDoRefresh(true)
    }
    else if (token.length !== 0) {
      setIsLoggedIn(true);
      setDoRefresh(true)
    } else {
      setIsLoggedIn(false);
      setDoRefresh(false)
    }
  }, [token]);

  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setToken('');
  };

  const loginHandler = (token) => {
    setToken(token)
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        doRefresh: doRefresh,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >{console.log(token)}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
