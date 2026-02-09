// // "use client";

// export default function StatsGrid({ items }) {
//   const accent = {
//     neutral: "text-[var(--text-main)] border-transparent",

//     danger: "text-rose-600 dark:text-rose-400 border-rose-500/40",

//     warning: "text-amber-600 dark:text-amber-400 border-amber-500/40",

//     info: "text-indigo-600 dark:text-indigo-400 border-indigo-500/40",

//     success: "text-emerald-600 dark:text-emerald-400 border-emerald-500/40",
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
//       {items.map((item) => {
//         const s = accent[item.variant || "neutral"];

//         return (
//           <div
//             key={item.label}
//             className={`
//               rounded-xl
//               border
//               border-[var(--border)]
//               bg-[var(--surface)]
//               p-5
//               shadow-sm
//               transition
//               min-w-0
//             `}>
//             {/* VALUE */}
//             <p
//               className={`
//                 text-lg sm:text-xl
//                 font-bold
//                 break-words
//                 ${s.split(" ")[0]}
//               `}>
//               {item.value}
//             </p>

//             {/* LABEL */}
//             <p className="text-xs mt-1 text-[var(--text-muted, #6b7280)]">
//               {item.label}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


export default function StatsGrid({ items }) {
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
      {items.map((item) => {
        const s = styles[item.variant] || styles.neutral;

        return (
          <div
            key={item.label}
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
              {item.value}
            </p>

            {/* LABEL */}
            <p className="text-xs mt-1 text-[var(--text-muted,#6b7280)]">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
