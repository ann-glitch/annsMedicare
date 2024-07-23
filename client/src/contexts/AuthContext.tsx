import React, { createContext, useContext, useState, useEffect, ReactNode, SetStateAction, Dispatch } from "react";
import API from "../api/axios";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      const response = await API.get("/auth/me");
      setUser(response.data);
      console.log("user fetched successfully", response)
    } catch (error) {
      console.error("Failed to fetch user", error);
      setUser(null);
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

  const logout = async () => {
    await API.get("/auth/logout");
    setUser(null);
    navigate("/")
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
