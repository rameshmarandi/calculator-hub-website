import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-12 border-t"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-sm">

        {/* BRAND */}
        <div>
          <h3 className="font-semibold mb-2">Swiftcalcfy</h3>
          <p style={{ color: "var(--text-muted)" }}>
            Free online calculators for finance, health, construction,
            education, and everyday use.
          </p>
        </div>

        {/* CATEGORIES */}
        <div>
          <h4 className="font-semibold mb-2">Calculators</h4>
          <ul className="space-y-1">
            <li><Link href="/finance">Finance</Link></li>
            <li><Link href="/health">Health</Link></li>
            <li><Link href="/construction">Construction</Link></li>
            <li><Link href="/education">Education</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div
        className="text-center text-xs py-3"
        style={{ color: "var(--text-muted)" }}
      >
        © {new Date().getFullYear()} Swiftcalcfy. All rights reserved.
      </div>
    </footer>
  );
}
