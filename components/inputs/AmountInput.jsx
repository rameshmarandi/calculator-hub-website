// import { formatIndianNumber , unformatNumber} from "../../lib/numberFormat";

import { formatIndianNumber, unformatNumber } from "../../lib/numberFormat";



// export function AmountInput({ label, value, onChange, placeholder }) {
//   function handleChange(e) {
//     const rawValue = unformatNumber(e.target.value);
//     if (!/^\d*$/.test(rawValue)) return;
//     onChange(rawValue);
//   }

//   return (
//     <label className="block space-y-1">
//       <span className="text-sm font-medium">{label}</span>

//       <div className="relative">
//         <input
//           type="text"
//           value={formatIndianNumber(value)}
//           placeholder={placeholder}
//           onChange={handleChange}
//           className="w-full rounded-md px-3 py-2 pl-8 border"
//           style={{
//             backgroundColor: "var(--surface-2)",
//             borderColor: "var(--border)",
//           }}
//         />

//         {/* ₹ Prefix */}
//         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
//           ₹
//         </span>
//       </div>
//     </label>
//   );
// }


export function AmountInput({ label, value, onChange, placeholder }) {
  function handleChange(e) {
    let raw = unformatNumber(e.target.value);

    // digits only
    if (!/^\d*$/.test(raw)) return;

    // prevent absurd values (safety)
    if (raw.length > 12) return;

    onChange(raw);
  }

  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>

      <div className="relative">
        <input
          type="text"
          inputMode="numeric"   // mobile keypad
          value={formatIndianNumber(value)}
          placeholder={placeholder}
          onChange={handleChange}
          onWheel={(e) => e.target.blur()} // stop scroll bug
          className="
            w-full rounded-md px-3 py-2 pl-8
            border transition
            bg-[var(--surface-2)]
            border-[var(--border)]
            focus:ring-2 focus:ring-indigo-500
          "
        />

        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          ₹
        </span>
      </div>
    </label>
  );
}
