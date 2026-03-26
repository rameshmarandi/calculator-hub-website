export function InputField({
  icon,
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  max,
  hasError = false,
}) {

  function handleChange(e) {
    let raw = e.target.value;

    /* allow digits + single decimal */
    raw = raw.replace(/[^0-9.]/g, "");

    /* prevent multiple decimals */
    const parts = raw.split(".");
    if (parts.length > 2) {
      raw = parts[0] + "." + parts.slice(1).join("");
    }

    const num = raw === "" ? "" : Number(raw);

    if (num !== "" && num < min) return;
    if (max && num > max) return;

    onChange(raw);
  }

  return (
    <label className="block space-y-1">
      <span className="text-sm flex items-center mb-1 gap-2">
        {icon}
        {label}
      </span>

      <input
        type="text"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onWheel={(e) => e.target.blur()}
        className="w-full rounded-md px-3 py-2 border transition"
        style={{
          backgroundColor: "var(--surface-2)",
          borderColor: hasError ? "#f87171" : "var(--border)",
        }}
      />
    </label>
  );
}