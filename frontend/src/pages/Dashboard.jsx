import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getUserNotes } from "../api/noteAPI";
import NoteCard from "../components/NoteCard";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle } from "react-feather";

export default function Dashboard() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await getUserNotes(token);
        const notesArray = Array.isArray(response) ? response : response.notes || [];
        setNotes(notesArray);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const latestNoteDate = notes.length > 0
    ? new Date(notes[0].updatedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 text-center mb-6">
        Welcome back, {user?.name?.split(" ")[0]}
      </h1>
      <p className="text-center text-slate-600 dark:text-zinc-400 mb-10">
        Here's a quick overview of your notes.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 text-center border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-emerald-600 dark:text-emerald-400 text-lg font-semibold mb-2">
            Total Notes
          </h2>
          <p className="text-4xl font-bold text-slate-800 dark:text-white">{notes.length}</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 text-center border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-emerald-600 dark:text-emerald-400 text-lg font-semibold mb-2">
            Last Updated
          </h2>
          <p className="text-lg font-medium text-slate-800 dark:text-white">
            {latestNoteDate}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 text-center border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-emerald-600 dark:text-emerald-400 text-lg font-semibold mb-2">
            New Note
          </h2>
          <button
            onClick={() => navigate("/create-note")}
            className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition"
          >
            <PlusCircle className="mr-2" size={18} />
            Add Note
          </button>
        </div>
      </div>

      {/* Recent Notes */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4 text-center">
          Your Recent Notes
        </h2>

        {loading && (
          <p className="text-center text-slate-600 dark:text-zinc-400">Loading notes...</p>
        )}

        {error && (
          <p className="text-center text-red-600 dark:text-red-400">{error}</p>
        )}

        {!loading && !error && (
          <>
            {notes.length === 0 ? (
              <p className="text-center text-slate-600 dark:text-zinc-400">
                You haven’t created any notes yet.
              </p>
            ) : (
              <>
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-zinc-100 dark:scrollbar-thumb-emerald-600 dark:scrollbar-track-zinc-800 pb-2">
                  <div className="flex gap-4 px-1">
                    {notes.slice(0, 6).map((note) => (
                      <div key={note._id} className="w-72 shrink-0">
                        <NoteCard
                          note={note}
                          showDelete={false}
                          showPinArchive={false}
                          hidePinnedBadge={true} // ✅ Hide yellow pinned icon
                        />
                      </div>
                    ))}
                  </div>
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
      </section>
    </div>
  );
}
