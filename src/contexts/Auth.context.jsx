import { createContext, useState, useCallback, useEffect, useMemo, useContext } from 'react';
import useSWRMutation from 'swr/mutation';
import * as api from '../api';

const JWT_TOKEN_KEY = 'jwtToken';
const USER_ID_KEY = 'userId';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  const {
    isMutating: loading,
    error,
    trigger: doLogin,
  } = useSWRMutation('users/login', api.post);

  useEffect(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token)); // = !!token (checks if it has a value -> illegible)
    setReady(true);
  },[token]);

 
  const login = useCallback(
    async (email, password) => {
      try {
        const { token, user } = await doLogin({
          email,
          password,
        });

        setToken(token); 
        setUser(user); 

        localStorage.setItem(JWT_TOKEN_KEY, token); 
        localStorage.setItem(USER_ID_KEY, user.id); 

        return true;
        
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin]
  );


  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      error,
      loading,
      ready,
      isAuthed,
      login,
      logout,
    }),
    [token, user, error, loading, ready, isAuthed, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
