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

  // Auto-scroll active item into view
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
        overflow-y-auto
        sticky top-16
        rounded-xl
        p-3
      "
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {Object.entries(calculators).map(([categoryKey, items]) => (
        <div key={categoryKey} className="mb-6">
          {/* CATEGORY TITLE */}
          <h3
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--text-main)" }}
          >
            {CATEGORY_LABELS[categoryKey] || categoryKey}
          </h3>

          {/* subtle divider */}
          <div
            className="mb-2"
            style={{
              height: "1px",
              backgroundColor: "var(--border)",
            }}
          />

          {/* CALCULATOR LIST */}
          <ul className="space-y-1">
            {items.map((calc) => {
              // const href = `/${categoryKey}/${calc.slug}`;
              // const isActive = pathname === href;

              const href = `/${categoryKey}/${calc.slug}`;
              const isActive = pathname.includes(`/${calc.slug}`);
              return (
                <li key={calc.slug}>
                  <Link
                    href={href}
                    ref={isActive ? activeRef : null}
                    className="block px-3 py-2 rounded text-sm transition-colors"
                    style={{
                      backgroundColor: isActive
                        ? "var(--active-bg)"
                        : "transparent",
                      color: isActive ? "var(--primary)" : "var(--text-main)",
                      fontWeight: isActive ? 500 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor =
                          "var(--hover-bg)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
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
