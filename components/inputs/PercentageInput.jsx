export function PercentageInput({
  label,
  value,
  onChange,
  placeholder,
  hasError = false,
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">
        {label}
      </span>

      <div className="relative">
        <input
          type="number"
          step="0.01"
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          className="w-full rounded-md px-3 py-2 pr-10 border transition"
          style={{
            backgroundColor: "var(--surface-2)",
            borderColor: hasError ? "#f87171" : "var(--border)",
          }}
        />

        {/* % Suffix */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          %
        </span>
      </div>
    </label>
  );
}
