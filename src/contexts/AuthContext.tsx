import { createContext, useContext, useEffect, useRef, useState } from "react";
import { registerAccount, loginAccount, checkAuthentication, refreshAuthentication, logoutAccount } from "../services/AuthApiService";

type AuthContextType = {
  isAuthenticated: boolean;
  handleLogin: (phone: string, password: string) => boolean;
  handleRegister: (fullName: string, phone: string, password: string) => boolean;
  handleLogout: () => void;
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

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      checkAuth();
      refreshAuth();
    }

    const interval = setInterval(() => {
      refreshAuth();
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  const checkAuth = async () => {
    try {
      await checkAuthentication();
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

  const handleLogin = (phone: string, password: string) => {
    try {
      loginAccount(phone, password);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      alert("Failed to login: " + error.response.data.message);
      setIsAuthenticated(false);
      return false;
    }
  }

  const handleRegister = (fullName: string, phone: string, password: string) => {
    try {
      registerAccount(fullName, phone, password);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      alert("Failed to register account: " + error.response.data.message);
      return false;
    }
  }

  const handleLogout = () => {
    try {
      logoutAccount();
      setIsAuthenticated(false);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}