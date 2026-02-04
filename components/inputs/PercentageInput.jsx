// export function PercentageInput({
//   label,
//   value,
//   onChange,
//   placeholder,
//   hasError = false,
// }) {
//   return (
//     <label className="block space-y-1">
//       <span className="text-sm font-medium">
//         {label}
//       </span>

//       <div className="relative">
//         <input
//           type="number"
//           step="0.01"
//           value={value}
//           placeholder={placeholder}
//           onChange={e => onChange(e.target.value)}
//           className="w-full rounded-md px-3 py-2 pr-10 border transition"
//           style={{
//             backgroundColor: "var(--surface-2)",
//             borderColor: hasError ? "#f87171" : "var(--border)",
//           }}
//         />

//         {/* % Suffix */}
//         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
//           %
//         </span>
//       </div>
//     </label>
//   );
// }


export function PercentageInput({
  label,
  value,
  onChange,
  placeholder,
  hasError = false,
}) {
  function handleChange(e) {
    let raw = e.target.value;

    // digits + decimal only
    raw = raw.replace(/[^0-9.]/g, "");

    const parts = raw.split(".");
    if (parts.length > 2) return;

    const num = raw === "" ? "" : Number(raw);

    // clamp 0 to 100
    if (num !== "" && (num < 0 || num > 100)) return;

    onChange(raw);
  }

  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>

      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onWheel={(e) => e.target.blur()}
          className="
            w-full rounded-md px-3 py-2 pr-10 border transition
            bg-[var(--surface-2)]
            focus:ring-2 focus:ring-indigo-500
          "
          style={{
            borderColor: hasError ? "#f87171" : "var(--border)",
          }}
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          %
        </span>
      </div>
    </label>
  );
}
