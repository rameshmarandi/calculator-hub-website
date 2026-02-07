export default function CalculatorLayout({
  title,
  subtitle,
  badges = [],
  children,
  article,
}) {
  return (
    <main className="max-w-6xl mx-auto ">
      {/* ================= CALCULATOR CARD ================= */}
      <section
        className="
          rounded-2xl
          border
          shadow-lg
          p-6
          space-y-6
          bg-[var(--surface)]
          border-[var(--border)]
        ">
        {/* HEADER */}
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-[var(--text-main)]">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm text-gray-500 max-w-2xl">{subtitle}</p>
          )}

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              {badges.map((b, i) => (
                <span key={i}>✔ {b}</span>
              ))}
            </div>
          )}
        </header>

        {/* CONTENT */}
        {children}
      </section>

      {/* ARTICLE */}
      {article}
    </main>
  );
}
