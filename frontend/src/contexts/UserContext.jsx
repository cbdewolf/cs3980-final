import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };
  

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return
      }

      try {
        const res = await fetch('http://127.0.0.1:8000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          console.warn("User fetch failed with status: 401");
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          console.warn("User fetch failed with status:", res.status);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
