"use client";

export default function SelectInput({
  label,
  value,
  onChange,
  options = [],
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-md
          px-3 py-2
          border
          bg-[var(--surface-2)]
          border-[var(--border)]
          text-sm
          focus:outline-none
        "
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
