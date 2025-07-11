// src/pages/TrashPage.jsx
import React, { useEffect, useState } from "react";
import { getTrashedNotes } from "../api/noteAPI";
import NoteCard from "../components/NoteCard";

export default function TrashPage() {
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrashed = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const notes = await getTrashedNotes(token);
      setTrashedNotes(notes);
    } catch (err) {
      console.error("Error loading trashed notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashed();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-rose-600 mb-8">Trashed Notes</h1>

      {loading ? (
        <p className="text-center text-slate-500">Loading trash...</p>
      ) : trashedNotes.length === 0 ? (
        <p className="text-center text-slate-500">Trash is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trashedNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              showPinArchive={false}
              showDelete={true}
              onChange={fetchTrashed}     
              isTrashView                 
            />
          ))}
        </div>
      )}
    </div>
  );
}
