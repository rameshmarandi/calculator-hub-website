"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved === "dark";

    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  function toggleTheme() {
    const next = !isDark;

    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  // render stable placeholder to avoid layout shift
  if (isDark === null) {
    return (
      <div className="w-9 h-9 border border-[color:var(--border)] rounded-md" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        w-9 h-9 flex items-center justify-center rounded-md
        border border-[color:var(--border)]
        bg-[color:var(--surface)]
        hover:bg-[color:var(--hover-bg)]
        transition
      "
      aria-label="Toggle dark mode">
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
