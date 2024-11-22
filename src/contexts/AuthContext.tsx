import { createContext, useContext, useEffect, useRef, useState } from "react";
import { registerAccount, loginAccount, checkAuthentication, refreshAuthentication } from "../services/AuthApiService";

type AuthContextType = {
  isAuthenticated: boolean;
  handleLogin: (phone: string, password: string) => boolean;
  handleRegister: (fullName: string, phone: string, password: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isInitialMount = useRef(true);

  const checkAuth = async () => {
    try {
      await checkAuthentication();
      setIsAuthenticated(true);
    } catch (error: any) {
      setIsAuthenticated(false);
    }
  }

  const refreshAuth = async () => {
    try {
      await refreshAuthentication();
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log(error);
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      refreshAuth();
      checkAuth();
    }
  }, []);

  const handleLogin = (phone: string, password: string) => {
    try {
      loginAccount(phone, password);
    } catch (error: any) {
      alert("Failed to login: " + error.response.data.message);
      return false;
    } finally {
      setIsAuthenticated(true);
      return true;
    }
  };

  const handleRegister = (fullName: string, phone: string, password: string) => {
    try {
      registerAccount(fullName, phone, password);
    } catch (error: any) {
      alert("Failed to register account: " + error.response.data.message);
      return false;
    } finally {
      setIsAuthenticated(true);
      return true;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
}