export function InputField({
  icon,
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
  hasError = false,
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm flex items-center gap-2">
        {icon}
        {label}
      </span>

      <input
        type="number"
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={e => onChange(e.target.value)}
        className={`w-full rounded-md px-3 py-2 border transition ${
          hasError ? "border-red-400" : ""
        }`}
        style={{
          backgroundColor: "var(--surface-2)",
          borderColor: hasError ? "#f87171" : "var(--border)",
        }}
      />
    </label>
  );
}
