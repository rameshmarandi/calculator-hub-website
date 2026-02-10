"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import SearchBox from "./SearchBox";
import DarkModeToggle from "./DarkModeToggle";

/* =========================================
   NAV LINKS
========================================= */

const NAV_LINKS = [
  { href: "/calculators", label: "Calculators" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* =========================================
   NAVBAR
========================================= */

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="border-b sticky top-0 z-50"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* ==================================================
           DESKTOP
        ================================================== */}
        <div className="hidden lg:flex items-center gap-6">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/swiftcalcfy-logo.png"
              alt="Swiftcalcfy Logo"
              width={40}
              height={40}
              priority
            />

            <span
              className="text-xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              Swiftcalcfy
            </span>
          </Link>

          {/* SEARCH */}
          <div className="flex-1 max-w-xl">
            <SearchBox />
          </div>

          {/* NAV */}
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
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <DarkModeToggle />
        </div>

        {/* ==================================================
           MOBILE
        ================================================== */}
        <div className="lg:hidden space-y-3">

          {/* TOP BAR */}
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/swiftcalcfy-logo.png"
                alt="Swiftcalcfy Logo"
                width={34}
                height={34}
                priority
              />

              <span
                className="text-base font-bold"
                style={{ color: "var(--primary)" }}
              >
                Swiftcalcfy
              </span>
            </Link>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2">
              <DarkModeToggle />

              <button
                aria-label="Toggle Menu"
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md"
                style={{ border: "1px solid var(--border)" }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* SEARCH */}
          <SearchBox />

          {/* MOBILE MENU */}
          {open && (
            <nav
              className="rounded-lg p-2 space-y-1"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded text-sm"
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