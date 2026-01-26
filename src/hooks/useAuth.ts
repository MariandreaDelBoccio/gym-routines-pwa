import { useState, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'gym-app-user';

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    setUser(savedUser);
    setLoading(false);
  }, []);

  const login = (username: string) => {
    localStorage.setItem(AUTH_STORAGE_KEY, username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}