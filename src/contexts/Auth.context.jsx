import { createContext, useState, useCallback, useEffect, useMemo, useContext } from 'react';
import useSWRMutation from 'swr/mutation';
import { jwtDecode } from 'jwt-decode';
import * as api from '../api';

const JWT_TOKEN_KEY = 'jwtToken';
const USER_ID_KEY = 'userId';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Helper function to check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token); // Decode the token to get the expiration time
  if (!exp) return true;
  return Date.now() >= exp * 1000;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    api.setAuthToken(token);
    const tokenExpired = isTokenExpired(token);
    setIsAuthed(Boolean(token) && !tokenExpired); // = !!token (checks if it has a value -> illegible)
    setReady(true);
  },[token]);

  const {
    isMutating: loginLoading,
    error: loginError,
    trigger: doLogin,
  } = useSWRMutation('users/login', api.post);

  const {
    isMutating: registerLoading,
    error: registerError,
    trigger: doRegister,
  } = useSWRMutation('users/register', api.post);

  //login moved to position: (setSession needs logout to be defined)
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  }, []);

  const setSession = useCallback(
    (token, user) => {
      if (isTokenExpired(token)) {
        logout(); // If token is expired, logout the user
        return;
      }

      setToken(token);
      setUser(user);

      localStorage.setItem(JWT_TOKEN_KEY, token); 
      localStorage.setItem(USER_ID_KEY, user.userID); 
    },
    [logout]
  );

 
  const login = useCallback(
    async (email, password) => {
      try {
        const { token, user } = await doLogin({
          email,
          password,
        });

        setSession(token, user);

        return true;
        
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin, setSession]
  );

  const register = useCallback(
    async (data) => {
      try {
        const { token, user } = await doRegister(data);
        setSession(token, user);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister, setSession],
  );

  //logout original position

  const value = useMemo(
    () => ({
      token,
      user,
      error: loginError || registerError,
      loading: loginLoading || registerLoading,
      ready,
      isAuthed,
      login,
      logout,
      register,
    }),
    [token, user, loginError, registerError, loginLoading, registerLoading, ready, isAuthed, login, logout, register]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
