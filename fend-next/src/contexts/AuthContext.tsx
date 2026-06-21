"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === "admin") {
          setUser(parsedUser);
          setToken(storedToken);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Redirect logic based on auth state
    const publicPaths = ["/admin/auth/login", "/admin/auth/register"];
    const isPublicPath = publicPaths.includes(pathname);

    if (!isLoading) {
      if (!user && !isPublicPath) {
        // Not authenticated and not on public page, redirect to login
        router.push("/admin/auth/login");
      } else if (user && isPublicPath) {
        // Authenticated but on public page, redirect to dashboard
        router.push("/admin");
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin/auth/login");
  };

  // Protect admin pages: don't render children when not authenticated
  // (the useEffect above handles the redirect, but we prevent flash of admin content)
  if (!isLoading) {
    const publicPaths = ["/admin/auth/login", "/admin/auth/register"];
    const isPublicPath = publicPaths.includes(pathname);

    if (!user && !isPublicPath) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }
  }

  // Show loading spinner while determining auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
