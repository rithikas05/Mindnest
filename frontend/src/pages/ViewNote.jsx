// src/pages/ViewNote.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteBySlug } from "../api/noteAPI";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import { PinIcon } from "lucide-react";

export default function ViewNote() {
  const { slug } = useParams();
  const { user } = useAuth();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const data = await getNoteBySlug(slug, token);
        setNote(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch note");
        setError("Could not find the note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading note...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;
  if (!note) return null;

  const formattedReminder = note.reminderDate
    ? new Date(note.reminderDate).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const isReminderPast = note.reminderDate && new Date(note.reminderDate) < new Date();

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 break-words">
            {note.title}
          </h1>
          {note.isPinned && (
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              <PinIcon className="w-4 h-4" />
              <span className="font-medium">Pinned</span>
            </div>
          )}
        </div>

        <p className="text-sm text-slate-500">Author: {user?.name}</p>

        {formattedReminder && (
          <p className={`text-sm ${isReminderPast ? "text-rose-600" : "text-amber-600"}`}>
            Reminder set for: {formattedReminder}
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-xl shadow border border-zinc-200 dark:border-zinc-700">
        <pre className="whitespace-pre-wrap text-slate-800 dark:text-slate-100 text-sm sm:text-base">
          {note.content}
        </pre>
      </div>
    </main>
  );
}
