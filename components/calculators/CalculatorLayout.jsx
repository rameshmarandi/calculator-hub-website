"use client";

export default function CalculatorLayout({
  title,
  badges,
  inputs,
  results,
  table,
  article,
}) {
  return (
    <section className="space-y-16">

      {/* MAIN CARD */}
      <div
        className="rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-10"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* HEADER */}
        <header className="mb-6 space-y-3">
          <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>

          {badges && (
            <div className="flex flex-wrap gap-3 text-xs opacity-70">
              {badges.map((b, i) => (
                <span key={i}>✔ {b}</span>
              ))}
            </div>
          )}
        </header>

        {/* GRID */}
        <div className="grid gap-10 lg:grid-cols-2">
          {inputs}
          {results}
        </div>

        {table}
      </div>

      {article}
    </section>
  );
}
