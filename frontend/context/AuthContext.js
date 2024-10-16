import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (e.g., by verifying a token in localStorage)
    const checkLoggedIn = async () => {
      // Implement your logic here
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    try {
      // Implement your login logic here
      setUser(/* logged in user data */);
      router.push('/dashboard');
    } catch (error) {
      message.error('Login failed');
    }
  };

  const logout = async () => {
    // Implement your logout logic here
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
