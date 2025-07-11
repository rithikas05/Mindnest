import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getAllNotes } from "../api/noteAPI";
import NoteCard from "../components/NoteCard";
import { PlusCircle } from "react-feather";
import { Link } from "react-router-dom";

export default function PrivateHome() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const data = await getAllNotes(token);
        setNotes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Something went wrong while fetching your notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <h1 className="text-3xl font-bold text-emerald-600 text-center sm:text-left">
          Welcome back, {user?.name?.split(" ")[0]} 🌿
        </h1>

        <Link
          to="/create"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
        >
          <PlusCircle size={20} />
          Create New Note
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-slate-600 text-lg">Loading your notes...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-600 font-medium">{error}</p>
      )}

      {/* Notes */}
      {!loading && !error && (
        <>
          {notes.length === 0 ? (
            <div className="text-center mt-20 text-slate-600 space-y-2">
              <p className="text-xl font-semibold">No notes found.</p>
              <p className="text-sm">Start your journey with your first note today! 📝</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-emerald-600 mb-4">
                Your Latest Notes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {notes.slice(0, 6).map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>

              {notes.length > 6 && (
                <div className="text-center mt-6">
                  <Link
                    to="/mynotes"
                    className="text-emerald-600 hover:underline text-sm font-medium"
                  >
                    → See all notes
                  </Link>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
