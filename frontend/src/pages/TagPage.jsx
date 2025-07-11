// src/pages/TagPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserNotes } from "../api/noteAPI";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";

export default function TagPage() {
  const { tag } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaggedNotes = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const allNotes = await getUserNotes(token);
        const filtered = allNotes.filter(
          (note) => note.tag?.toLowerCase() === tag.toLowerCase()
        );
        setNotes(filtered);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch notes by tag.");
      } finally {
        setLoading(false);
      }
    };

    fetchTaggedNotes();
  }, [tag]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-emerald-600 mb-6">
        Notes tagged with <span className="italic">#{tag}</span>
      </h1>

      {loading ? (
        <p className="text-center text-slate-600">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-center text-slate-500">No notes found for this tag.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
