import { useState, useEffect } from "react";
import { useLocation } from "wouter";

interface User {
  id: number;
  email: string;
  role: string;
  name: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [, setLocation] = useLocation();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Verifica se l'utente è autenticato
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          user: data.user,
          loading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error("Errore verifica autenticazione:", error);
      setAuthState({
        user: null,
        loading: false,
        error: "Errore di connessione",
      });
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setAuthState({
        user: null,
        loading: false,
        error: null,
      });

      // Redirect alla homepage
      setLocation("/");
    } catch (error) {
      console.error("Errore logout:", error);
    }
  };

  const requireAuth = (redirectTo: string = "/login") => {
    if (!authState.loading && !authState.user) {
      // Salva l'URL corrente per redirect dopo login
      const currentPath = window.location.pathname;
      setLocation(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`);
      return false;
    }
    return true;
  };

  const requireAdmin = (redirectTo: string = "/login") => {
    if (!authState.loading) {
      if (!authState.user) {
        const currentPath = window.location.pathname;
        setLocation(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`);
        return false;
      }
      if (authState.user.role !== "admin") {
        setLocation("/"); // Redirect homepage se non admin
        return false;
      }
    }
    return true;
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    isAdmin: authState.user?.role === "admin",
    logout,
    requireAuth,
    requireAdmin,
    refreshAuth: checkAuth,
  };
}
