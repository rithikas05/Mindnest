import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import PublicHome from "./pages/PublicHome";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateHome from "./pages/PrivateHome";
import Dashboard from "./pages/Dashboard";
import MyNotes from "./pages/MyNotes";
import ViewNote from "./pages/ViewNote";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import TagPage from "./pages/TagPage";
import TrashPage from "./pages/TrashPage";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-zinc-50 text-slate-800 dark:bg-zinc-900 dark:text-zinc-100 font-sora">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<PrivateHome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mynotes" element={<MyNotes />} />
              <Route path="/note/:slug" element={<ViewNote />} />
              <Route path="/create-note" element={<CreateNote />} />
              <Route path="/edit/:slug" element={<EditNote />} />
              <Route path="/tags/:tag" element={<TagPage />} />
              <Route path="/trash" element={<TrashPage />} /> 
            </Route>

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="p-10 text-center text-2xl text-red-600">
                  404 – Page Not Found
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />

        {/* Nature-themed Toaster */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "Sora, sans-serif",
              border: "1px solid #D1FAE5",
              background: "#ECFDF5",
              color: "#065F46",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#D1FAE5",
              },
            },
            error: {
              style: {
                border: "1px solid #FECACA",
                background: "#FEF2F2",
                color: "#991B1B",
              },
              iconTheme: {
                primary: "#EF4444",
                secondary: "#FEE2E2",
              },
            },
          }}
        />
      </div>
    </Router>
  );
}
