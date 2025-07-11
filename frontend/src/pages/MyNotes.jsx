import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { getUserNotes } from "../api/noteAPI";
import NoteCard from "../components/NoteCard";

export default function MyNotes() {
  useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showArchived, setShowArchived] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("userToken");
      const fetchedNotes = await getUserNotes(token);
      setNotes(Array.isArray(fetchedNotes) ? fetchedNotes : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load your notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tag?.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesSearch &&
      note.isTrashed === false &&
      note.isArchived === showArchived
    );
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "pinned":
        return b.isPinned - a.isPinned;
      default: // newest
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
  });

  const pinnedNotes = sortedNotes.filter((note) => note.isPinned);
  const otherNotes = sortedNotes.filter((note) => !note.isPinned);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
          {showArchived ? "Archived Notes" : "Your Notes"}
        </h1>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Link
            to="/create-note"
            className="px-5 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 transition font-medium"
          >
            + Add New Note
          </Link>
          <button
            onClick={() => setShowArchived((prev) => !prev)}
            className="px-4 py-2 border border-sky-500 text-sky-600 dark:text-sky-400 rounded hover:bg-sky-100 dark:hover:bg-sky-800 transition font-medium"
          >
            {showArchived ? "Show Active Notes" : "Show Archived"}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title, content, tag..."
          className="w-full md:w-1/2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
          <option value="pinned">Pinned First</option>
        </select>
      </div>

      {/* Content */}
      {loading && (
        <p className="text-center text-slate-700 dark:text-slate-300">
          Loading your notes...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-medium">{error}</p>
      )}
      {!loading && !error && sortedNotes.length === 0 && (
        <p className="text-center text-slate-600 dark:text-slate-400 mt-10">
          No {showArchived ? "archived" : "active"} notes found.
        </p>
      )}
      {!loading && !error && sortedNotes.length > 0 && (
        <>
          {pinnedNotes.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-emerald-500 mb-3">
                📌 Pinned
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onChange={fetchNotes}
                  />
                ))}
              </div>
            </>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onChange={fetchNotes}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
