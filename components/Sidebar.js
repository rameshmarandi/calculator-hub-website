"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
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
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [pathname]);

  return (
    <aside
      className="
        h-[calc(100vh-64px)]
        sticky top-16
        overflow-y-auto
        bg-[var(--surface)]
        border-r border-[var(--border)]
        px-3 py-3
      "
    >
      {Object.entries(calculators).map(([categoryKey, items]) => (
        <div key={categoryKey} className="mt-6 first:mt-0">
          {/* ===== Sticky Header ===== */}
          <h3
            className="
              sticky top-0 z-20
              px-3 py-2
              text-xs font-bold uppercase tracking-widest

              bg-[color-mix(in_srgb,var(--primary)_8%,var(--surface))]
              text-[var(--primary)]

              border-b border-[var(--border)]
              border-l-4 border-l-[var(--primary)]
            "
          >
            {CATEGORY_LABELS[categoryKey] || categoryKey}
          </h3>

          {/* ===== List ===== */}
          <ul className="mt-2 space-y-1">
            {items.map((calc) => {
              const href = `/${categoryKey}/${calc.slug}`;
              const isActive = pathname.includes(`/${calc.slug}`);

              return (
                <li key={calc.slug} className="relative">
                  <Link
                    href={href}
                    ref={isActive ? activeRef : null}
                    className={`
                      relative block
                      px-3 py-2
                      rounded-lg
                      text-sm
                      no-underline

                      transition-all duration-200 ease-out

                      ${
                        isActive
                          ? `
                            bg-[color-mix(in_srgb,var(--primary)_15%,transparent)]
                            text-[var(--primary)]
                            font-semibold
                            translate-x-1
                          `
                          : `
                            text-[var(--text-main)]
                            hover:bg-[var(--hover-bg)]
                            hover:translate-x-1
                          `
                      }
                    `}
                  >
                    {/* Left active indicator */}
                    {isActive && (
                      <span
                        className="
                          absolute left-0 top-1/2
                          -translate-y-1/2
                          h-5 w-1.5
                          rounded-r-md
                          bg-[var(--primary)]
                        "
                      />
                    )}

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
