import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteBySlug, updateNote } from "../api/noteAPI";
import toast from "react-hot-toast";

export default function EditNote() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [color, setColor] = useState("zinc");
  const [reminderDate, setReminderDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const note = await getNoteBySlug(slug, token);
        setTitle(note.title || "");
        setContent(note.content || "");
        setTag(note.tag || "");
        setColor(note.color || "zinc");
        setReminderDate(note.reminderDate || "");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load note");
        navigate("/mynotes");
      } finally {
        setFetching(false);
      }
    };
    fetchNote();
  }, [slug, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      await updateNote(
        slug,
        {
          title: title.trim(),
          content: content.trim(),
          tag: tag.trim(),
          color,
          reminderDate,
        },
        token
      );
      toast.success("Note updated successfully!");
      navigate("/mynotes");
    } catch (err) {
      console.error(err);
      toast.error("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <p className="text-center py-10 text-slate-700 dark:text-slate-300">
        Loading note...
      </p>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 text-center">
        Edit Note
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-slate-800 dark:text-zinc-100 font-medium mb-1">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-slate-800 dark:text-zinc-100 font-medium mb-1">Content</label>
          <textarea
            rows="8"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          ></textarea>
        </div>

        {/* Tag */}
        <div>
          <label className="block text-slate-800 dark:text-zinc-100 font-medium mb-1">Tag (optional)</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            disabled={loading}
            placeholder="e.g., Personal, Work, Ideas"
            className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          />
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-slate-800 dark:text-zinc-100 font-medium mb-1">Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={loading}
            className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          >
            <option value="zinc">Zinc</option>
            <option value="emerald">Emerald</option>
            <option value="sky">Sky</option>
            <option value="amber">Amber</option>
            <option value="rose">Rose</option>
          </select>
        </div>

        {/* Reminder Date */}
        <div>
          <label className="block text-slate-800 dark:text-zinc-100 font-medium mb-1">
            Reminder (optional)
          </label>
          <input
            type="datetime-local"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            disabled={loading}
            className="w-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 dark:bg-emerald-500 text-white py-3 rounded font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-400 transition"
        >
          {loading ? "Saving..." : "Update Note"}
        </button>

        {/* Cancel */}
        <button
          type="button"
          onClick={() => navigate("/mynotes")}
          disabled={loading}
          className="w-full text-center text-sm text-slate-600 dark:text-slate-400 hover:underline mt-2"
        >
          Cancel and go back
        </button>
      </form>
    </main>
  );
}
