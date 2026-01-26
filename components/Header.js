"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBox from "./SearchBox";
import DarkModeToggle from "./DarkModeToggle";

const NAV_LINKS = [
  { href: "/finance", label: "Finance" },
  { href: "/health", label: "Health" },
  { href: "/construction", label: "Construction" },
  { href: "/education", label: "Education" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur"
      style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center gap-6">

          {/* LOGO */}
          <Link
            href="/"
            className="text-xl font-bold whitespace-nowrap"
            style={{ color: "var(--primary)" }}
          >
            EasyCalc
          </Link>

          {/* SEARCH */}
          <SearchBox />

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-5">
            <nav className="flex items-center gap-4 text-sm">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition"
                  style={{ color: "var(--text-main)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <span
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              EN
            </span>

            <DarkModeToggle />
          </div>
        </div>

        {/* ================= MOBILE / TABLET ================= */}
        <div className="lg:hidden space-y-3">

          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              EasyCalc
            </Link>

            <div className="flex items-center gap-2">
              <button
                aria-label="Menu"
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md"
                style={{ border: "1px solid var(--border)" }}
              >
                ☰
              </button>

              <DarkModeToggle />
            </div>
          </div>

          <SearchBox />

          {/* MOBILE MENU */}
          {open && (
            <nav
              className="rounded-lg p-3 space-y-2"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded transition"
                  style={{ color: "var(--text-main)" }}
                >
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
