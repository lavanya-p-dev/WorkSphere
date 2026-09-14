import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type {
  LoginRequest,
  User,
} from "../types/auth.types";

import { loginUser } from "../api/authApi";
import { authStorage } from "../services/authStorage";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {

  const [user, setUser] = useState<User | null>(
    authStorage.getUser()
  );

  const login = async (
    request: LoginRequest
  ): Promise<void> => {

    const response = await loginUser(request);

    authStorage.setToken(response.accessToken);
    authStorage.setUser(response.user);

    setUser(response.user);
  };

  const logout = (): void => {
    authStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value= {{
    user,
      isAuthenticated: !!user,
        login,
        logout,
      }
}
    >
  { children }
  </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};