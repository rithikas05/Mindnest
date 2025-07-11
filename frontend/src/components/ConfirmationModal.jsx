import React, { useEffect } from "react";

export default function ConfirmationModal({
  isOpen,
  title = "Confirm",
  message = "Are you sure?",
  onConfirm,
  onCancel,
}) {
  // Close modal on ESC key
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onCancel}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
      >
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl w-full max-w-sm sm:max-w-sm md:max-w-md p-6 mx-auto transition-all">
          <h2
            id="modal-title"
            className="text-xl font-semibold text-emerald-700 dark:text-emerald-400 mb-4"
          >
            {title}
          </h2>
          <p className="text-slate-800 dark:text-zinc-200 mb-6">{message}</p>
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-500 transition"
              autoFocus
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
