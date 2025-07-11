import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 py-6 text-sm text-slate-600 dark:text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p>&copy; {new Date().getFullYear()} Mindnest. All rights reserved.</p>
        <p className="italic">“Every thought you write plants a seed.”</p>
      </div>
    </footer>
  );
}
