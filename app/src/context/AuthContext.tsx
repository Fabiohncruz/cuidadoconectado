import { createContext, useContext, useEffect, useState } from 'react';
import storage from './Storage.tsx';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const initialAuthState: AuthState = {
  authenticated: false,
};

export interface AuthState {
  authenticated: boolean,
  type?: 'login' | 'device',
  accessToken?: string
}

interface AuthProviderProps {
  children: any;
}

interface AuthContextData {
  ready: boolean,
  auth: AuthState,
  setAuth: (auth: AuthState) => Promise<void>,
}

const AuthProvider = ({ children }: AuthProviderProps) => {

  const [ready, setReady] = useState(false);
  const [auth, setAuthState] = useState(initialAuthState);

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authState = await storage.load<AuthState>({ key: 'auth' });
      setAuthState(authState);

    } catch (err) {
      setAuthState(initialAuthState);
    }
    setReady(true);
  };

  // Update AsyncStorage & context state
  const setAuth = async (auth: AuthState) => {
    try {
      await storage.save({ key: 'auth', data: auth });
      setAuthState(auth);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, ready }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuthContext };