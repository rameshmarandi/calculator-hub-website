const VARIANT_STYLES = {
  primary: {
    bg: "var(--result-primary-bg)",
    border: "var(--result-primary-border)",
  },
  success: {
    bg: "var(--result-success-bg)",
    border: "var(--result-success-border)",
  },
  warning: {
    bg: "var(--result-warning-bg)",
    border: "var(--result-warning-border)",
  },
  danger: {
    bg: "var(--result-danger-bg)",
    border: "var(--result-danger-border)",
  },
  neutral: {
    bg: "var(--surface-2)",
    border: "var(--border)",
  },
};

export function ResultCard({
  icon,
  label,
  value,
  variant = "neutral",
}) {
  const style = VARIANT_STYLES[variant];

  return (
    <div
      className="rounded-lg p-4 flex items-center gap-3 transition"
      style={{
        backgroundColor: style.bg,
        border: `2px solid ${style.border}`,
        boxShadow:
          variant === "primary"
            ? "0 8px 24px rgba(0,0,0,0.08)"
            : "none",
      }}
    >
      {icon}
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="font-semibold text-sm">{value}</p>
      </div>
    </div>
  );
}
