"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, AuthSession } from "@/types";

const AUTH_KEY = "auth_session";
const CREDENTIALS = { email: "admin@dashboard.com", password: "admin123", name: "Admin" };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        const session: AuthSession = JSON.parse(raw);
        setUser(session.user);
      }
    } catch {
      // ignore parse errors
    }
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      const u: User = { email: CREDENTIALS.email, name: CREDENTIALS.name };
      const session: AuthSession = { user: u, loggedAt: new Date().toISOString() };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      setUser(u);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
