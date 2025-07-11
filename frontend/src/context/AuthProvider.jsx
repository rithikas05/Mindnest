// src/context/AuthProvider.jsx
import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { getProfile, loginUser, registerUser } from "../api/authAPI";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return setLoading(false);
      try {
        const { user } = await getProfile(token);
        setUser(user);
      } catch {
        localStorage.removeItem("userToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await loginUser(credentials);
      if (!token) throw new Error("No token returned from login");

      localStorage.setItem("userToken", token);
      setUser(user);
      return { token, user };
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await registerUser(userData);
      if (!token) throw new Error("No token returned from register");

      localStorage.setItem("userToken", token);
      setUser(user);
      return { token, user };
    } catch (err) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
