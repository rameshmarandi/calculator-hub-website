export default function ResultHero({
  label,
  value,
  showPerDay = false,
  days = 30,
}) {

  const safeNumber = (v) => {
    if (v === null || v === undefined) return 0;

    const cleaned =
      typeof v === "string"
        ? v.replace(/[₹, ]/g, "")
        : v;

    const match = String(cleaned).match(/-?\d+(\.\d+)?/);

    const n = match ? Number(match[0]) : 0;

    return Number.isFinite(n) ? n : 0;
  };

  const numericValue = safeNumber(value);

  const formatNumber = (num) => {
    const n = safeNumber(num);

    return n.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  const perDay =
    showPerDay && days > 0
      ? Math.round(numericValue / days)
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
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {label}
      </p>

      <p
        className="
          text-4xl md:text-5xl
          font-extrabold
          mt-3
          text-indigo-600
          dark:text-indigo-400
        "
      >
        {formatNumber(numericValue)}
        {typeof value === "string" && value.replace(/[0-9.,₹ ]/g, "")}
      </p>

      {showPerDay && perDay !== null && (
        <p className="text-xs text-gray-500 mt-3">
          ≈ {formatNumber(perDay)} per day
        </p>
      )}
    </div>
  );
}