import React from "react";
import { Link, Navigate } from "react-router-dom";
import { FaFeatherAlt, FaRegStickyNote, FaLock, FaRocket } from "react-icons/fa";
import { useAuth } from "../context/useAuth";

export default function PublicHome() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  const features = [
    {
      icon: <FaRegStickyNote className="text-2xl text-emerald-600" />,
      title: "Simple & Fast",
      description: "Write and save your notes instantly, with a clean minimal UI.",
    },
    {
      icon: <FaLock className="text-2xl text-emerald-600" />,
      title: "Secure & Private",
      description: "Your notes are safe and only accessible to you.",
    },
    {
      icon: <FaRocket className="text-2xl text-emerald-600" />,
      title: "Blazing Performance",
      description: "Optimized for speed with a delightful experience.",
    },
  ];

  const sampleNotes = [
    {
      title: "Mindfulness Practice",
      content: "Start each morning with 10 minutes of silence to set the tone for the day.",
    },
    {
      title: "Project Ideas",
      content: "1. Habit Tracker App\n2. Travel Blog\n3. AI-Powered Journal",
    },
    {
    title: "Travel Packing List",
    content: "Don't forget: Passport, charger, headphones, medicines, power bank, sunscreen.",
  },
  ];

  return (
    <main className="bg-zinc-50 dark:bg-zinc-900 text-slate-800 dark:text-slate-100">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-16 text-center">
        <div className="space-y-6 max-w-3xl">
          <div className="flex justify-center">
            <div className="bg-emerald-100 dark:bg-emerald-800 p-4 rounded-full shadow">
              <FaFeatherAlt className="text-4xl text-emerald-600 dark:text-emerald-200" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-emerald-600">
            Welcome to Mindnest 
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300">
            Capture thoughts. Organize ideas. Stay mindful. A serene note-taking experience made just for you.
          </p>

          <div className="flex justify-center gap-4 flex-wrap mt-6">
            <Link
              to="/login"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900 px-6 py-3 rounded-lg text-lg font-medium transition"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Notes Preview */}
      <section className="py-16 px-6 bg-zinc-100 dark:bg-zinc-800">
        <h2 className="text-3xl font-bold text-center text-emerald-600 mb-10">Sample Notes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sampleNotes.map((note, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 rounded-lg p-5 shadow border border-zinc-200 dark:border-zinc-700"
            >
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">{note.title}</h3>
              <pre className="text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                {note.content}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-emerald-600 mb-10">Why Mindnest?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow border border-zinc-200 dark:border-zinc-700 text-center"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-emerald-50 via-lime-100 to-emerald-50 dark:from-emerald-900 dark:to-lime-900">
        <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-6">
          Ready to nurture your thoughts?
        </h2>
        <p className="text-lg text-slate-700 dark:text-slate-200 mb-8">
          Join Mindnest and let your ideas blossom in a clutter-free, peaceful space.
        </p>
        <Link
          to="/register"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
        >
          Get Started Free
        </Link>
      </section>
    </main>
  );
}
