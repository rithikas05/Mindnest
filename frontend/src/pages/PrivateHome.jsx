import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getUserNotes } from "../api/noteAPI";
import NoteCard from "../components/NoteCard";
import { useNavigate, Link } from "react-router-dom";
import { PlusCircle } from "react-feather";

export default function PrivateHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await getUserNotes(token);
        const notesArray = Array.isArray(response) ? response : response.notes || [];
        setNotes(notesArray);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Something went wrong while fetching your notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const latestNotes = [...notes]
    .filter(note => !note.isTrashed) // optional: exclude trashed
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <h1 className="text-3xl font-bold text-emerald-600 text-center sm:text-left">
          Welcome back, {user?.name?.split(" ")[0]}
        </h1>
        <button
          onClick={() => navigate("/create-note")}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
        >
          <PlusCircle size={20} />
          Create New Note
        </button>
      </div>

      {/* Status Messages */}
      {loading && <p className="text-center text-slate-600 text-lg">Loading your notes...</p>}
      {error && <p className="text-center text-red-600 font-medium">{error}</p>}

      {/* Notes Section */}
      {!loading && !error && (
        <>
          {latestNotes.length === 0 ? (
            <div className="text-center mt-20 text-slate-600 space-y-2">
              <p className="text-xl font-semibold">No notes found.</p>
              <p className="text-sm">Start your journey with your first note today! </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-emerald-600 mb-4">
                Your Latest Notes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {latestNotes.map((note) => (
                  <NoteCard key={note._id} note={note} showDelete={false} showPinArchive={false} />
                ))}
              </div>
              <div className="text-center mt-6">
                <Link
                  to="/mynotes"
                  className="text-emerald-600 hover:underline text-sm font-medium"
                >
                  See All Notes →
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
