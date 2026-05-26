import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t bg-[var(--surface)] border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* BRAND */}
        <div className="space-y-3 col-span-2 md:col-span-1">
          <h3 className="text-base font-semibold text-[var(--primary)]">
            Swiftcalcfy
          </h3>

          <p className="text-[var(--text-muted)] leading-relaxed">
            Free online calculators for finance, construction, health,
            education, and everyday productivity. Fast, accurate, and no signup
            required.
          </p>
        </div>

        {/* PRODUCT */}
        <div>
          <h4 className="font-semibold mb-3">Product</h4>

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
                className="hover:text-[var(--primary)]">
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
            {/* <li>
              <Link href="/utility" className="hover:text-[var(--primary)]">
                Utilities
              </Link>
            </li> */}
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-semibold mb-3">Company</h4>

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
          <h4 className="font-semibold mb-3">Legal</h4>

          <ul className="space-y-2 text-[var(--text-muted)]">
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-[var(--primary)]">
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

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border)] text-center text-xs py-4 text-[var(--text-muted)]">
        © {year} Swiftcalcfy. All rights reserved.
      </div>
    </footer>
  );
}
