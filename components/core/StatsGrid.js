export default function StatsGrid({ items }) {

  const safeItems = Array.isArray(items) ? items : [];

  const styles = {
    neutral: {
      text: "text-[var(--text-main)]",
      bg: "bg-[var(--surface)]",
      border: "border-[var(--border)]",
    },

    danger: {
      text: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/30",
    },

    warning: {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/30",
    },

    info: {
      text: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      border: "border-indigo-200 dark:border-indigo-500/30",
    },

    success: {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/30",
    },

    primary: {
      text: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
      border: "border-indigo-200 dark:border-indigo-500/30",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
      {safeItems.map((item, index) => {

        const label = item?.label ?? "—";
        const value = item?.value ?? "0";
        const variant = item?.variant ?? "neutral";

        const s = styles[variant] || styles.neutral;

        return (
          <div
            key={label || index}
            className={`
              rounded-xl
              border
              ${s.border}
              ${s.bg}
              p-5
              shadow-sm
              transition
              hover:shadow-md
              min-w-0
            `}
          >
            {/* VALUE */}
            <p
              className={`
                text-lg sm:text-xl
                font-bold
                break-words
                ${s.text}
              `}
            >
              {value}
            </p>

            {/* LABEL */}
            <p className="text-xs mt-1 text-[var(--text-muted,#6b7280)]">
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}