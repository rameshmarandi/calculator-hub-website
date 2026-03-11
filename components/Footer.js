import Link from "next/link";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Wallet,
  Calculator,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t bg-[var(--surface)] border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        {/* BRAND + PRODUCT */}
        <div className="space-y-5 col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold text-[var(--primary)] flex items-center gap-2">
            <Calculator size={18} />
            Swiftcalcfy
          </h3>

          <p className="text-[var(--text-muted)] leading-relaxed">
            Free online calculators for finance, construction, health,
            education, and productivity planning. Fast, accurate tools with no
            signup required.
          </p>

          {/* PRODUCT CARD */}
          <div className="border border-[var(--border)] rounded-lg p-3 bg-[var(--surface-2)] hover:border-[var(--primary)] hover:shadow-sm transition cursor-pointer">
            <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
              Our Product
            </p>
            <a
              href="https://hisabtracker.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-[var(--border)] rounded-lg p-3 bg-[var(--surface-2)] hover:border-[var(--primary)] hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3 mb-1">
                <Image
                  src="https://res.cloudinary.com/dvhjtth5f/image/upload/v1763839566/hisabTrackerOnlyImage_eyqbuq.png"
                  alt="HisabTracker Expense Tracker"
                  width={34}
                  height={34}
                />

                <span className="font-medium text-[var(--primary)]">
                  HisabTracker – Expense Tracker
                </span>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Track expenses, manage budgets, and monitor daily spending with
                the HisabTracker personal finance app.
              </p>
            </a>
            {/* <a
    href="https://hisabtracker.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 hover:opacity-90 transition"
  >
    <Image
      src="https://res.cloudinary.com/dvhjtth5f/image/upload/v1763839566/hisabTrackerOnlyImage_eyqbuq.png"
      alt="HisabTracker Expense Tracker App"
      width={34}
      height={34}
      className="rounded"
    />

    <span className="font-medium text-[var(--primary)]">
      HisabTracker – Expense Tracker
    </span>
  </a> */}

            {/* <p className="text-xs text-[var(--text-muted)] leading-relaxed">
    Track expenses, manage budgets, and monitor daily spending
    with the HisabTracker personal finance app.
  </p> */}
          </div>

          {/* SOCIAL */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
              Follow Swiftcalcfy
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://x.com/swiftcalcfy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-[var(--surface-2)] transition"
              >
                <Twitter size={18} />
              </a>

              <a
                href="https://www.facebook.com/swiftcalcfy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-[var(--surface-2)] transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/swiftcalcfy/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-[var(--surface-2)] transition"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* CALCULATORS */}
        <div>
          <h4 className="font-semibold mb-4">Calculators</h4>

          <ul className="space-y-2 text-[var(--text-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--primary)]">
                All Calculators
              </Link>
            </li>
            <li>
              <Link href="/finance" className="hover:text-[var(--primary)]">
                Finance
              </Link>
            </li>
            <li>
              <Link
                href="/construction"
                className="hover:text-[var(--primary)]"
              >
                Construction
              </Link>
            </li>
            <li>
              <Link href="/health" className="hover:text-[var(--primary)]">
                Health
              </Link>
            </li>
            <li>
              <Link href="/education" className="hover:text-[var(--primary)]">
                Education
              </Link>
            </li>
            <li>
              <Link href="/utility" className="hover:text-[var(--primary)]">
                Utilities
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>

          <ul className="space-y-2 text-[var(--text-muted)]">
            <li>
              <Link href="/about" className="hover:text-[var(--primary)]">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--primary)]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>

          <ul className="space-y-2 text-[var(--text-muted)]">
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-[var(--primary)]"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[var(--primary)]">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-[var(--primary)]">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[var(--border)] text-center text-xs py-4 text-[var(--text-muted)]">
        © {year} Swiftcalcfy. All rights reserved.
      </div>
    </footer>
  );
}
