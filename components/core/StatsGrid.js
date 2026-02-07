// "use client";

export default function StatsGrid({ items }) {
  const accent = {
    neutral: "text-[var(--text-main)] border-transparent",

    danger: "text-rose-600 dark:text-rose-400 border-rose-500/40",

    warning: "text-amber-600 dark:text-amber-400 border-amber-500/40",

    info: "text-indigo-600 dark:text-indigo-400 border-indigo-500/40",

    success: "text-emerald-600 dark:text-emerald-400 border-emerald-500/40",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
      {items.map((item) => {
        const s = accent[item.variant || "neutral"];

        return (
          <div
            key={item.label}
            className={`
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-5
              shadow-sm
              transition
              min-w-0
            `}>
            {/* VALUE */}
            <p
              className={`
                text-lg sm:text-xl
                font-bold
                break-words
                ${s.split(" ")[0]}
              `}>
              {item.value}
            </p>

            {/* LABEL */}
            <p className="text-xs mt-1 text-[var(--text-muted, #6b7280)]">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
