"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SearchBox from "./SearchBox";
import DarkModeToggle from "./DarkModeToggle";

const NAV_LINKS = [
  { href: "/finance", label: "Finance" },
  { href: "/health", label: "Health" },
  { href: "/construction", label: "Construction" },
  { href: "/education", label: "Education" },
  { href: "/astrology", label: "Astrology" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:flex items-center gap-6">
          {/* LOGO */}
          <Link
            href="/"
            className="text-xl font-bold shrink-0"
            style={{ color: "var(--primary)" }}>
            Swiftcalcfy(Ramesh Marandi)
          </Link>

          {/* SEARCH */}
          <div className="flex-1 max-w-xl">
            <SearchBox />
          </div>

          {/* NAV + ACTIONS */}
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-md text-sm transition-colors"
                  style={{ color: "var(--text-main)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--hover-bg)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }>
                  {link.label}
                </Link>
              ))}
            </nav>

            <DarkModeToggle />
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="lg:hidden space-y-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-bold"
              style={{ color: "var(--primary)" }}>
              Swiftcalcfy
            </Link>

            <div className="flex items-center gap-2">
              <DarkModeToggle />

              <button
                aria-label="Toggle Menu"
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md"
                style={{ border: "1px solid var(--border)" }}>
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* SEARCH (mobile only) */}
          <SearchBox />

          {open && (
            <nav
              className="rounded-lg p-2 space-y-1"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}>
              {[
                ...NAV_LINKS,
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded text-sm transition-colors"
                  style={{ color: "var(--text-main)" }}>
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
