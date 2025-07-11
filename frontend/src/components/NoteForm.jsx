import React, { useState, useEffect } from "react";

export default function NoteForm({
  initialValues = { title: "", content: "" },
  onSubmit,
  submitLabel = "Create",
}) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [content, setContent] = useState(initialValues.content || "");
  const [errors, setErrors] = useState({});

  // Update form when switching between notes
  useEffect(() => {
    setTitle(initialValues.title || "");
    setContent(initialValues.content || "");
    setErrors({});
  }, [initialValues]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      content: content.trim(),
    });
  };

  const handleAddChecklist = () => {
    const checklist = `\n## My Checklist\n\n- [ ] Task one\n- [ ] Task two\n`;
    setContent((prev) => prev + checklist);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full mx-auto bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700"
    >
      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium text-slate-800 dark:text-slate-200 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          className={`w-full px-3 py-2 rounded-md bg-white dark:bg-zinc-800 text-slate-800 dark:text-white border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
            errors.title ? "border-red-500" : "border-zinc-300 dark:border-zinc-600"
          }`}
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Checklist Template */}
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={handleAddChecklist}
          className="text-sm text-emerald-600 hover:underline font-medium"
        >
          + Checklist Template
        </button>
      </div>

      {/* Content */}
      <div className="mb-6">
        <label htmlFor="content" className="block font-medium text-slate-800 dark:text-slate-200 mb-1">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note using markdown. Use - [ ] for checklists."
          className={`w-full px-3 py-2 rounded-md resize-y bg-white dark:bg-zinc-800 text-slate-800 dark:text-white border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
            errors.content ? "border-red-500" : "border-zinc-300 dark:border-zinc-600"
          }`}
        />
        {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
