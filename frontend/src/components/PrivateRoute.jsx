// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <p className="text-slate-500 dark:text-slate-300 text-lg animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
