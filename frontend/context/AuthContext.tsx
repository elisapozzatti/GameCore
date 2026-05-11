import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface DecodedUser {
  id?: string;
  email?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

interface AuthContextType {
  user: DecodedUser | null;
  setUser: React.Dispatch<React.SetStateAction<DecodedUser | null>>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //inizializza da token salvato
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const decoded = jwtDecode<DecodedUser>(token);
          setUser(decoded);
        } else {
          setUser(null);
        }
      } catch (err) {
        await AsyncStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // login
  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);

      const decoded = jwtDecode<DecodedUser>(token);
      setUser(decoded);
    } catch (err) {
      console.log("Errore login:", err);
    }
  };

  //logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUser(null);
    } catch (err) {
      console.log("Errore logout:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//hook custom
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve essere usato dentro AuthProvider");
  }

  return context;
};
