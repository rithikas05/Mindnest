// src/components/NoteCard.jsx
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Eye, Edit2, Trash2, Tag, Clock, Bookmark, BookOpen, Archive, RotateCw,
} from "react-feather";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";
import {
  deleteNote,
  permanentDeleteNote,
  restoreNote,
  togglePin,
  toggleArchive,
} from "../api/noteAPI";

export default function NoteCard({ note, showPinArchive = true, showDelete = true, onChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState(""); // "trash" | "permanent" | "restore"

  const [localPinned, setLocalPinned] = useState(note.isPinned);
  const [localArchived, setLocalArchived] = useState(note.isArchived);

  const { title, content, slug, updatedAt, tag, color, reminderDate } = note;

  const isTrashPage = pathname === "/trash";
  const isStaticPage = pathname === "/home" || pathname === "/dashboard";

  const formattedDate = new Date(updatedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedReminder = reminderDate
    ? new Date(reminderDate).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const snippet = content.length > 100 ? content.slice(0, 100) + "..." : content;

  const handleConfirmAction = async () => {
    try {
      const token = localStorage.getItem("userToken");

      if (actionType === "trash") {
        await deleteNote(slug, token);
        toast.success("Note moved to trash.");
      } else if (actionType === "permanent") {
        await permanentDeleteNote(slug, token);
        toast.success("Note permanently deleted.");
      } else if (actionType === "restore") {
        await restoreNote(slug, token);
        toast.success("Note restored.");
      }

      setShowConfirm(false);

      // Notify parent to reload notes after action completes
      if (typeof onChange === "function") {
        onChange();
      }
    } catch (err) {
      console.error(err);
      toast.error("Action failed. Try again.");
      setShowConfirm(false);
    }
  };

  const handlePinToggle = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await togglePin(slug, token);
      setLocalPinned(!localPinned);
      toast.success(`Note ${localPinned ? "unpinned" : "pinned"}`);
      if (typeof onChange === "function") {
        onChange();
      }
    } catch {
      toast.error("Failed to pin/unpin.");
    }
  };

  const handleArchiveToggle = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await toggleArchive(slug, token);
      setLocalArchived(!localArchived);
      toast.success(`Note ${localArchived ? "unarchived" : "archived"}`);
      if (typeof onChange === "function") {
        onChange();
      }
    } catch {
      toast.error("Failed to archive/unarchive.");
    }
  };

  return (
    <div
      className={`relative bg-white dark:bg-zinc-800 rounded-xl border-l-4 shadow-sm p-5 hover:shadow-md transition-all border-${color}-500 dark:border-${color}-400`}
    >
      {/* Pinned icon – hide on /home and /dashboard */}
      {localPinned && !isTrashPage && !isStaticPage && (
        <Bookmark
          size={18}
          className="absolute top-3 right-3 text-yellow-500 dark:text-yellow-400"
          title="Pinned"
        />
      )}

      <h3 className="text-lg font-semibold text-slate-800 dark:text-zinc-100 mb-2 line-clamp-2">
        {title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-zinc-300 mb-3 line-clamp-3">{snippet}</p>

      <div className="flex flex-wrap items-center justify-between text-sm gap-2 mb-2">
        <span className="text-xs italic text-zinc-500 dark:text-zinc-400">{formattedDate}</span>

        {tag && (
          <Link
            to={`/tags/${tag.toLowerCase()}`}
            className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <Tag size={14} />
            {tag}
          </Link>
        )}

        {formattedReminder && (
          <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
            <Clock size={14} />
            {formattedReminder}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end flex-wrap gap-4 mt-3">
        {/* View button always visible */}
        <button
          onClick={() => navigate(`/note/${slug}`)}
          className="text-emerald-600 hover:scale-110 transition dark:text-emerald-400"
          title="View"
        >
          <Eye size={18} />
        </button>

        {/* Edit – always visible except in Trash */}
        {!isTrashPage && (
          <button
            onClick={() => navigate(`/edit/${slug}`)}
            className="text-blue-500 hover:scale-110 transition"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
        )}

        {/* Other actions – only if not on static pages */}
        {!isStaticPage && (
          <>
            {!isTrashPage && showPinArchive && (
              <>
                <button
                  onClick={handlePinToggle}
                  title={localPinned ? "Unpin" : "Pin"}
                  className="text-yellow-500 hover:scale-110 transition"
                >
                  <Bookmark size={18} />
                </button>

                <button
                  onClick={handleArchiveToggle}
                  title={localArchived ? "Unarchive" : "Archive"}
                  className="text-indigo-500 hover:scale-110 transition"
                >
                  {localArchived ? <BookOpen size={18} /> : <Archive size={18} />}
                </button>
              </>
            )}

            {isTrashPage ? (
              <>
                <button
                  onClick={() => {
                    setActionType("restore");
                    setShowConfirm(true);
                  }}
                  className="text-sky-500 hover:scale-110 transition"
                  title="Restore"
                >
                  <RotateCw size={18} />
                </button>
                <button
                  onClick={() => {
                    setActionType("permanent");
                    setShowConfirm(true);
                  }}
                  className="text-red-500 hover:scale-110 transition"
                  title="Permanently Delete"
                >
                  <Trash2 size={18} />
                </button>
              </>
            ) : (
              showDelete && (
                <button
                  onClick={() => {
                    setActionType("trash");
                    setShowConfirm(true);
                  }}
                  className="text-red-500 hover:scale-110 transition"
                  title="Move to Trash"
                >
                  <Trash2 size={18} />
                </button>
              )
            )}
          </>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmationModal
        isOpen={showConfirm}
        title={
          actionType === "trash"
            ? "Move Note to Trash"
            : actionType === "permanent"
            ? "Permanently Delete Note"
            : "Restore Note"
        }
        message={
          actionType === "trash"
            ? "Are you sure you want to move this note to trash?"
            : actionType === "permanent"
            ? "This action is permanent. Are you sure?"
            : "Do you want to restore this note?"
        }
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}
