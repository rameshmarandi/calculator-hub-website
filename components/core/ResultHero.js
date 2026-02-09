

import { formatINR } from "@/lib/format";

export default function ResultHero({
  label,
  value,
  showPerDay = false,   // default OFF
  days = 30,            // configurable
}) {
  const perDay = showPerDay ? Math.round(value / days) : null;

  return (
    <div
      className="
        rounded-2xl
        border
        p-8
        text-center
        transition
        bg-indigo-50
        dark:bg-indigo-500/10
        border-indigo-200
        dark:border-indigo-500/30
        shadow-sm
      "
    >
      {/* LABEL */}
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {label}
      </p>

      {/* MAIN VALUE */}
      <p
        className="
          text-4xl md:text-5xl
          font-extrabold
          mt-3
          text-indigo-600
          dark:text-indigo-400
        "
      >
        {formatINR(value)}
      </p>

      {/* PER DAY (optional) */}
      {showPerDay && (
        <p className="text-xs text-gray-500 mt-3">
          ≈ {formatINR(perDay)} per day
        </p>
      )}
    </div>
  );
}
