import express from "express";
import {
  createNote,
  getUserNotes,
  getNoteBySlug,
  updateNoteBySlug,
  softDeleteNote,
  permanentDeleteNote,
  restoreNote,
  togglePin,
  toggleArchive,
  getTrashedNotes
} from "../controllers/noteController.js";

import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes (all require login)
router.post("/", verifyToken, createNote); // Create
router.get("/", verifyToken, getUserNotes); // Get all notes
router.get("/trash/all", verifyToken, getTrashedNotes); // Place this BEFORE ":slug"
router.get("/:slug", verifyToken, getNoteBySlug); // View one

router.put("/:slug", verifyToken, updateNoteBySlug); // Update
router.patch("/:slug/trash", verifyToken, softDeleteNote); // Move to trash
router.delete("/:slug/permanent", verifyToken, permanentDeleteNote); // Permanent delete
router.patch("/:slug/restore", verifyToken, restoreNote); // Restore from trash
router.patch("/:slug/pin", verifyToken, togglePin); // Pin/Unpin
router.patch("/:slug/archive", verifyToken, toggleArchive); // Archive/Unarchive

export default router;
