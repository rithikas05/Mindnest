import Note from "../models/note.js";
import slugify from "slugify";

// CREATE a new note
export const createNote = async (req, res) => {
  try {
    const { title, content, tag, color, reminderDate } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Generate a unique slug
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    while (await Note.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const note = await Note.create({
      title,
      content,
      slug,
      tag: tag || "General",
      color: color || "zinc",
      reminderDate: reminderDate || null,
      user: req.user._id,
    });

    res.status(201).json({ message: "Note created successfully", note });
  } catch (err) {
    console.error("Create Note Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all notes for logged-in user
export const getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
      isTrashed: false,
    }).sort({ updatedAt: -1 });

    res.status(200).json({ message: "Notes fetched successfully", notes });
  } catch (err) {
    console.error("Fetch Notes Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET single note by slug
export const getNoteBySlug = async (req, res) => {
  try {
    const note = await Note.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note fetched by slug", note });
  } catch (err) {
    console.error("Fetch Note By Slug Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE a note by slug
export const updateNoteBySlug = async (req, res) => {
  try {
    const { title, content, tag, color, reminderDate } = req.body;

    const note = await Note.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // If title is changed, regenerate slug (ensuring uniqueness)
    if (title && title !== note.title) {
      const baseSlug = slugify(title, { lower: true, strict: true });
      let newSlug = baseSlug;
      let counter = 1;
      while (
        await Note.findOne({ slug: newSlug, _id: { $ne: note._id } })
      ) {
        newSlug = `${baseSlug}-${counter++}`;
      }
      note.slug = newSlug;
      note.title = title;
    }

    note.content = content || note.content;
    note.tag = tag || note.tag;
    note.color = color || note.color;
    note.reminderDate = reminderDate || note.reminderDate;

    const updatedNote = await note.save();

    res.status(200).json({ message: "Note updated successfully", note: updatedNote });
  } catch (err) {
    console.error("Update Note Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// MOVE note to trash (soft delete)
export const softDeleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isTrashed = true;
    await note.save();

    res.status(200).json({ message: "Note moved to trash", note });
  } catch (err) {
    console.error("Soft Delete Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PERMANENTLY delete a trashed note
export const permanentDeleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      slug: req.params.slug,
      user: req.user._id,
      isTrashed: true,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found or not in trash" });
    }

    res.status(200).json({ message: "Note permanently deleted" });
  } catch (err) {
    console.error("Permanent Delete Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// RESTORE note from trash
export const restoreNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isTrashed = false;
    await note.save();

    res.status(200).json({ message: "Note restored from trash", note });
  } catch (err) {
    console.error("Restore Note Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// TOGGLE pin/unpin
export const togglePin = async (req, res) => {
  try {
    const note = await Note.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.status(200).json({
      message: `Note ${note.isPinned ? "pinned" : "unpinned"} successfully`,
      note,
    });
  } catch (err) {
    console.error("Toggle Pin Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// TOGGLE archive/unarchive
export const toggleArchive = async (req, res) => {
  try {
    const note = await Note.findOne({
      slug: req.params.slug,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isArchived = !note.isArchived;
    await note.save();

    res.status(200).json({
      message: `Note ${note.isArchived ? "archived" : "unarchived"} successfully`,
      note,
    });
  } catch (err) {
    console.error("Toggle Archive Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all trashed notes for logged-in user
export const getTrashedNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
      isTrashed: true,
    }).sort({ updatedAt: -1 });

    res.status(200).json({ message: "Trashed notes fetched", notes });
  } catch (err) {
    console.error("Fetch Trashed Notes Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};