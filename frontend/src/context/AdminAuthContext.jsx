import { createContext, useContext, useState, useCallback } from 'react';

const AdminAuthContext = createContext(null);
const STORAGE_KEY = 'vizagfresh_admin_token';

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => window.localStorage.getItem(STORAGE_KEY) || '');
  const [admin, setAdmin] = useState(null);

  const login = useCallback((newToken, adminInfo) => {
    window.localStorage.setItem(STORAGE_KEY, newToken);
    setToken(newToken);
    setAdmin(adminInfo);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setToken('');
    setAdmin(null);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ token, admin, isAuthenticated: !!token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return ctx;
}
