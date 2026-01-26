"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import calculators from "@/data/calculators";

const CATEGORY_LABELS = {
  finance: "Finance Calculators",
  construction: "Construction Calculators",
  health: "Health & Fitness",
  education: "Education Calculators",
  astrology: "Astrology Calculators",
  utility: "General & Utility",
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        h-[calc(100vh-64px)]
        overflow-y-auto
        pr-2
        sticky top-16
      "
    >
      {Object.entries(calculators).map(([categoryKey, items]) => (
        <div key={categoryKey} className="mb-6">
          {/* CATEGORY TITLE */}
          <h3 className="text-xs font-semibold uppercase text-slate-500 mb-2">
            {CATEGORY_LABELS[categoryKey] || categoryKey}
          </h3>

          {/* CALCULATOR LIST */}
          <ul className="space-y-1">
            {items.map((calc) => {
              const href = `/${categoryKey}/${calc.slug}`;
              const isActive = pathname === href;

              return (
                <li key={calc.slug}>
                  <Link
                    href={href}
                    className="block px-3 py-2 rounded text-sm transition-colors"
                    style={{
                      backgroundColor: isActive
                        ? "var(--active-bg)"
                        : "transparent",
                      color: isActive ? "var(--primary)" : "var(--text-main)",
                      fontWeight: isActive ? 500 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        e.currentTarget.style.backgroundColor =
                          "var(--hover-bg)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}

                    // className={`
                    //   block px-3 py-2 rounded text-sm transition
                    //   ${
                    //     isActive
                    //       ? "bg-blue-50 text-blue-600 font-medium"
                    //       : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    //   }
                    // `}
                  >
                    {calc.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
