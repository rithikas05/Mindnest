import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../api/noteAPI";
import toast from "react-hot-toast";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [color, setColor] = useState("zinc");
  const [reminderDate, setReminderDate] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      await createNote({ title, content, tag, color, reminderDate }, token);
      toast.success("Note created successfully!");
      navigate("/mynotes");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-8">
        Create New Note
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 sm:p-8 shadow-md space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            placeholder="Note Title"
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 px-4 py-2 bg-white dark:bg-zinc-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="6"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            placeholder="Write your note here..."
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 px-4 py-2 resize-y bg-white dark:bg-zinc-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          ></textarea>
        </div>

        {/* Tag */}
        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
            Tag <span className="text-slate-400 text-xs">(optional)</span>
          </label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            disabled={loading}
            placeholder="e.g., Work, Study, Idea"
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 px-4 py-2 bg-white dark:bg-zinc-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
            Note Color
          </label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={loading}
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 px-4 py-2 bg-white dark:bg-zinc-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          >
            <option value="zinc">Zinc (default)</option>
            <option value="emerald">Emerald</option>
            <option value="sky">Sky</option>
            <option value="amber">Amber</option>
            <option value="rose">Rose</option>
          </select>
        </div>

        {/* Reminder Date */}
        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
            Reminder <span className="text-slate-400 text-xs">(optional)</span>
          </label>
          <input
            type="datetime-local"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            disabled={loading}
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 px-4 py-2 bg-white dark:bg-zinc-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold text-white transition ${
            loading
              ? "bg-emerald-400 cursor-not-allowed opacity-70"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </main>
  );
}
