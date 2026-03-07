export default function ResultHero({
  label,
  value,
  showPerDay = false,
  days = 30,
}) {

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "-";

    const n = Number(num);

    if (!Number.isFinite(n)) return "-";

    const rounded = Math.round(n * 100) / 100;

    return rounded.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  const perDay =
    showPerDay && typeof value === "number"
      ? Math.round(value / days)
      : null;

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

      {/* VALUE */}
      <p
        className="
          text-4xl md:text-5xl
          font-extrabold
          mt-3
          text-indigo-600
          dark:text-indigo-400
        "
      >
        {formatNumber(value)}
      </p>

      {/* PER DAY */}
      {showPerDay && perDay !== null && (
        <p className="text-xs text-gray-500 mt-3">
          ≈ {formatNumber(perDay)} per day
        </p>
      )}
    </div>
  );
}