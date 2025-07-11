import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FaFeatherAlt } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  const navLinkClass = ({ isActive }) =>
    (isActive ? "font-semibold text-emerald-600" : "text-slate-700 dark:text-zinc-200 hover:text-emerald-600") +
    " block transition";

  return (
    <nav className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-emerald-600 font-bold text-xl"
          onClick={handleLinkClick}
          aria-label="Go to home"
        >
          <div className="bg-emerald-100 dark:bg-emerald-800 p-2 rounded-full shadow">
            <FaFeatherAlt className="text-2xl text-emerald-600 dark:text-emerald-200" />
          </div>
          <span>Mindnest</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to={user ? "/home" : "/"} onClick={handleLinkClick} className={navLinkClass}>
            Home
          </NavLink>
          {user && (
            <>
              <NavLink to="/mynotes" onClick={handleLinkClick} className={navLinkClass}>
                My Notes
              </NavLink>
              <NavLink to="/dashboard" onClick={handleLinkClick} className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/trash" onClick={handleLinkClick} className={navLinkClass}>
                Trash
              </NavLink>
            </>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-xl text-emerald-600 hover:scale-110 transition"
            aria-label="Toggle dark mode"
          >
            {isDark ? <MdLightMode /> : <MdDarkMode />}
          </button>

          {user ? (
            <>
              <span className="text-slate-700 dark:text-zinc-200 font-medium">Hi, {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="text-slate-700 dark:text-zinc-200 hover:text-emerald-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={handleLinkClick}
                className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
        >
          <svg
            className="w-6 h-6 text-emerald-600 dark:text-emerald-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 py-6 space-y-4 text-left">
          <div className="space-y-3">
            <NavLink to={user ? "/home" : "/"} onClick={handleLinkClick} className={navLinkClass}>
              Home
            </NavLink>
            {user && (
              <>
                <NavLink to="/mynotes" onClick={handleLinkClick} className={navLinkClass}>
                  My Notes
                </NavLink>
                <NavLink to="/dashboard" onClick={handleLinkClick} className={navLinkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/trash" onClick={handleLinkClick} className={navLinkClass}>
                  Trash
                </NavLink>
              </>
            )}

            {/* Mode Toggle – Text only */}
            <button
              onClick={toggleTheme}
              className="text-left text-emerald-600 hover:text-emerald-700 transition"
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                className="w-full px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="block text-slate-700 dark:text-zinc-200 hover:text-emerald-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
