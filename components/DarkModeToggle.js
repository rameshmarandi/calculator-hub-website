"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // ONLY read current state, do NOT apply theme
  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const nextIsDark = !html.classList.contains("dark");

    html.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  }

  if (!mounted) return null;

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
      aria-label="Toggle dark mode"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
