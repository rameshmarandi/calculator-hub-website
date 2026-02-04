"use client";

export default function ResultPanel({ children }) {
  return (
    <div
      className="space-y-6 lg:sticky lg:top-24 p-5 rounded-xl border shadow-md"
      style={{
        backgroundColor: "var(--surface-2)",
        borderColor: "var(--border)",
      }}
    >
      {children}
    </div>
  );
}
