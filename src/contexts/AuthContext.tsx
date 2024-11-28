import { createContext, useContext, useEffect, useRef, useState } from "react";
import { loginAccount, checkAuthentication, refreshAuthentication, logoutAccount, registerAccount, requestOtp, verifyOtp } from "../services/AuthApiService";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isAuthenticated: boolean;
  otpCountdown: number;
  fullName: string;
  phone: string;
  checkAuth: () => Promise<boolean>;
  handleLogin: (phone: string, password: string) => Promise<boolean>;
  handleLogout: () => void;
  handleRegister: (fullName: string, phone: string, password: string) => Promise<boolean>;
  handleSendOtp: (phone: string) => void;
  handleVerifyOtp: (otp: string) => Promise<boolean>;
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
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const isInitialMount = useRef(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (otpCountdown > 0) {
      const interval = setInterval(() => {
        setOtpCountdown(otpCountdown - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [otpCountdown]);

  const checkAuth = async () => {
    try {
      const response = await checkAuthentication();
      setIsAuthenticated(true);
      setFullName(response.fullName);
      setPhone(response.phone);
      if (response.privilege === 'ROLE_ADMIN') {
        return true;
      }
      return false;
    } catch (error: any) {
      setIsAuthenticated(false);
      return false;
    }
  }

  const refreshAuth = async () => {
    try {
      await refreshAuthentication();
      setIsAuthenticated(true);
    } catch (error: any) {
      setIsAuthenticated(false);
    }
  }

  const handleLogin = async (phone: string, password: string) => {
    try {
      await loginAccount(phone, password);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      setIsAuthenticated(false);
      return false;
    }
  }

  const handleLogout = () => {
    try {
      logoutAccount();
      setIsAuthenticated(false);
      navigate('/');
    } catch (error: any) {
      alert("Failed to logout: " + error.response.data.message);
    }
  }

  const handleRegister = async (fullName: string, phone: string, password: string) => {
    try {
      await registerAccount(fullName, phone, password);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      alert("Failed to register account: " + error.response.data.message);
      setIsAuthenticated(false);
      return false;
    }
  }

  const handleSendOtp = async (phone: string) => {
    try {
      await requestOtp(phone);
      if (phone.length < 8) {
        return;
      }
      setOtpCountdown(60);
      setPhone(phone);
    } catch (error: any) {
      alert("Failed to send OTP: " + error.response.data.message);
    }
  }

  const handleVerifyOtp = async (otp: string) => {
    try {
      await verifyOtp(phone, otp);
      return true;
    } catch (error: any) {
      alert("Failed to verify OTP: " + error.response.data.message);
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, otpCountdown, fullName, phone, checkAuth, handleLogin, handleLogout, handleRegister, handleSendOtp, handleVerifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
}