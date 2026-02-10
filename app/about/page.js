export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--text-main)]">
      <div className="max-w-3xl mx-auto px-4 py-12 leading-7">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>

        <p className="mb-4 text-[var(--text-muted)]">
          Welcome to <strong>Swiftcalcfy</strong>, a fast, reliable, and free
          online calculator platform designed to make everyday calculations
          simple for everyone.
        </p>

        {/* Mission */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Our Mission</h2>

        <p className="mb-4 text-[var(--text-muted)]">
          Our mission is straightforward. Provide accurate, instant, and easy to
          use calculators that save time and remove manual effort. Whether you
          are calculating loan EMIs, taxes, health metrics, construction
          estimates, or daily math problems, Swiftcalcfy helps you get results
          quickly without complexity.
        </p>

        {/* What We Offer */}
        <h2 className="text-xl font-semibold mt-8 mb-3">What We Offer</h2>

        <ul className="list-disc pl-6 mb-4 space-y-1 text-[var(--text-muted)]">
          <li>Finance and investment calculators</li>
          <li>Loan and EMI calculators</li>
          <li>Health and fitness tools</li>
          <li>Construction and area calculators</li>
          <li>Education and percentage tools</li>
          <li>General everyday utility calculators</li>
        </ul>

        <p className="mb-4 text-[var(--text-muted)]">
          All tools work directly in your browser with no registration required.
          You get instant results with a clean and distraction free experience.
        </p>

        {/* Why Choose */}
        <h2 className="text-xl font-semibold mt-8 mb-3">
          Why Choose Swiftcalcfy
        </h2>

        <ul className="list-disc pl-6 mb-4 space-y-1 text-[var(--text-muted)]">
          <li>100 percent free to use</li>
          <li>No account or login required</li>
          <li>Fast and lightweight performance</li>
          <li>Mobile friendly design</li>
          <li>Accurate formulas and instant results</li>
          <li>Regular updates and improvements</li>
        </ul>

        {/* Vision */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Our Vision</h2>

        <p className="mb-4 text-[var(--text-muted)]">
          We aim to build one of the most comprehensive calculator platforms on
          the internet with hundreds of tools covering finance, health,
          education, and daily productivity. Our focus is on simplicity,
          performance, and usefulness rather than unnecessary complexity.
        </p>

        {/* Transparency */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Transparency</h2>

        <p className="mb-4 text-[var(--text-muted)]">
          Swiftcalcfy may display advertisements to support hosting and
          development costs. We always aim to keep the experience clean and
          user-friendly. Your privacy and trust remain our top priority.
        </p>

        {/* Contact */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Get in Touch</h2>

        <p className="text-[var(--text-muted)]">
          Have suggestions, feedback, or feature requests? We are always
          improving.
          <br />
          Contact us at{" "}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=swiftcalcfy@gmail.com&su=Feedback%20for%20Swiftcalcfy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--primary)] hover:underline">
            swiftcalcfy@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
