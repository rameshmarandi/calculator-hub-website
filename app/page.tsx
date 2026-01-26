import Link from "next/link";
import categories from "@/data/categories";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">

      {/* HERO SECTION */}
      <section className="text-center mb-16">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "var(--text-main)" }}
        >
          Free Online Calculators
        </h1>

        <p
          className="max-w-2xl mx-auto text-base sm:text-lg"
          style={{ color: "var(--text-muted)" }}
        >
          Smart, fast, and accurate calculators for finance, health,
          construction, education, and more.  
          No sign-up. No confusion. 100% free.
        </p>
      </section>

      {/* CATEGORY GRID */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(cat => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="group rounded-xl p-6 transition-all"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-lg font-semibold mb-2 transition-colors"
              style={{ color: "var(--text-main)" }}
            >
              {cat.name}
            </h2>

            <p
              className="text-sm mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Explore all {cat.name.toLowerCase()} calculators with
              instant and accurate results.
            </p>

            <span
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--primary)" }}
            >
              Explore →
            </span>
          </Link>
        ))}
      </section>

      {/* SEO / TRUST CONTENT */}
      <section className="mt-20 max-w-3xl mx-auto text-sm leading-7">
        <h2
          className="text-xl font-semibold mb-3"
          style={{ color: "var(--text-main)" }}
        >
          Why use our calculator platform?
        </h2>

        <p style={{ color: "var(--text-muted)" }}>
          Our online calculator platform is designed to help users make
          quick and accurate calculations without complicated formulas.
          Whether you are planning your finances, tracking health goals,
          estimating construction costs, or solving everyday problems,
          our calculators work instantly on any device.
        </p>
      </section>

    </main>
  );
}
