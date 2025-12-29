import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import { STORAGE_KEYS } from '@/lib/constants';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      // For now, just check if token exists
      // In real implementation, you would validate the token with the backend
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DETAILS);
      if (userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DETAILS);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login - in real implementation, call your API
      // For now, just set a mock token
      // Password is validated in real implementation
      if (!email || !password) {
        return false;
      }
      const mockToken = 'mock_token_' + Date.now();
      const mockUser = { email, id: 1, name: 'User' };

      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
      localStorage.setItem(STORAGE_KEYS.USER_DETAILS, JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success("Logged in successfully");
      return true;
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // In real implementation, call logout API
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DETAILS);
      setIsAuthenticated(false);
      setUser(null);
      toast.success("Logged out successfully");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };

