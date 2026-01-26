"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchIndex } from "@/data/searchIndex";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const boxRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    setResults(
      searchIndex
        .filter(item => item.label.toLowerCase().includes(q))
        .slice(0, 8)
    );
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e) {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      setQuery(results[activeIndex].label);
      router.push(results[activeIndex].slug);
      setResults([]);
    } else if (e.key === "Escape") {
      setResults([]);
    }
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search calculators..."
        className="
          w-full rounded-md px-4 py-2 text-sm
          focus:outline-none focus:ring-2
        "
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text-main)",
          caretColor: "var(--primary)",
        }}
      />

      {results.length > 0 && (
        <div
          className="absolute z-50 mt-1 w-full rounded-md shadow-lg"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          {results.map((item, i) => {
            const isActive = i === activeIndex;

            return (
              <div
                key={item.slug}
                onClick={() => {
                  setQuery(item.label);
                  router.push(item.slug);
                  setResults([]);
                }}
                className="px-4 py-2 text-sm cursor-pointer transition"
                style={{
                  backgroundColor: isActive
                    ? "rgba(26,115,232,0.08)"
                    : "transparent",
                  color: isActive
                    ? "var(--primary)"
                    : "var(--text-main)",
                }}
              >
                <div className="font-medium">{item.label}</div>
                <div
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.category}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
