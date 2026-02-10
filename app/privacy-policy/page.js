export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--text-main)]">
      <div className="max-w-3xl mx-auto px-4 py-12 leading-7">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

        <p className="text-sm text-[var(--text-muted)] mb-6">
          Last Updated: February 2026
        </p>

        <p className="mb-4 text-[var(--text-muted)]">
          Welcome to <strong>Swiftcalcfy</strong>. Your privacy matters to us.
          This Privacy Policy explains how information is collected, used, and
          protected when you use our website and online calculators.
        </p>

        <p className="mb-4 text-[var(--text-muted)]">
          By accessing or using this website, you agree to the practices
          described below.
        </p>

        {/* Information Collection */}
        <h2 className="text-xl font-semibold mt-8 mb-3">
          Information We Collect
        </h2>

        <p className="mb-4 text-[var(--text-muted)]">
          Our calculators work directly inside your browser. We do not require
          account creation or registration, and we do not intentionally collect
          personal information.
        </p>

        <p className="mb-2 font-medium">
          Automatically collected data may include:
        </p>

        <ul className="list-disc pl-6 mb-4 space-y-1 text-[var(--text-muted)]">
          <li>Device and browser type</li>
          <li>IP address</li>
          <li>Visited pages and usage behavior</li>
          <li>Time spent on pages</li>
          <li>Cookies and basic analytics data</li>
        </ul>

        <p className="mb-4 text-[var(--text-muted)]">
          If you contact us directly, we may receive your name, email address,
          and message details only for communication purposes.
        </p>

        {/* Usage */}
        <h2 className="text-xl font-semibold mt-8 mb-3">
          How We Use Information
        </h2>

        <ul className="list-disc pl-6 mb-4 space-y-1 text-[var(--text-muted)]">
          <li>Improve website performance and speed</li>
          <li>Analyze traffic and user behavior</li>
          <li>Fix bugs and technical issues</li>
          <li>Provide better calculator tools</li>
          <li>Prevent abuse or fraudulent activity</li>
          <li>Serve relevant advertisements</li>
        </ul>

        <p className="mb-4 text-[var(--text-muted)]">
          We do not sell, trade, or rent personal information to third parties.
        </p>

        {/* Cookies */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Cookies</h2>

        <p className="mb-4 text-[var(--text-muted)]">
          Cookies are small files stored on your device to enhance your browsing
          experience. They help us remember preferences, analyze traffic, and
          show relevant ads. You can disable cookies through your browser
          settings, though some features of the website may not function
          correctly.
        </p>

        {/* Ads */}
        <h2 className="text-xl font-semibold mt-8 mb-3">
          Google AdSense and Third Party Advertising
        </h2>

        <p className="mb-4 text-[var(--text-muted)]">
          We use third-party advertising services such as Google AdSense to show
          ads. These services may use cookies or web beacons to display ads
          based on your interests and browsing history.
        </p>

        <p className="mb-4 text-[var(--text-muted)]">
          You can control or disable personalized ads by visiting:
          <br />
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--primary)] hover:underline">
            Google Ads Settings
          </a>
        </p>

        {/* Analytics */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Analytics</h2>

        <p className="mb-4 text-[var(--text-muted)]">
          We may use analytics tools such as Google Analytics to understand how
          users interact with the site. These tools collect anonymized usage
          data that helps us improve functionality and user experience.
        </p>

        {/* Security */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Data Security</h2>

        <p className="mb-4 text-[var(--text-muted)]">
          We use HTTPS encryption, secure hosting, and industry best practices
          to protect data. However, no online platform can guarantee complete
          security.
        </p>

        {/* Third Party Links */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Third Party Links</h2>

        <p className="mb-4 text-[var(--text-muted)]">
          Our website may contain links to external websites. We are not
          responsible for the privacy practices or content of those sites.
        </p>

        {/* Children */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Children’s Privacy</h2>

        <p className="mb-4 text-[var(--text-muted)]">
          Swiftcalcfy is not intended for children under 13. We do not knowingly
          collect personal information from children.
        </p>

        {/* Updates */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Policy Updates</h2>

        <p className="mb-4 text-[var(--text-muted)]">
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated revision date.
        </p>

        {/* Contact */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Contact Us</h2>

        <p className="text-[var(--text-muted)]">
          If you have any questions about this policy, contact us at:
          <br />
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
