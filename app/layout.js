import "./globals.css";

import { Inter } from "next/font/google";
import Script from "next/script";

import SiteShell from "@/components/SiteShell";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://swiftcalcfy.com"),
  title: {
    default: "Swiftcalcfy | Free Online Calculators",
    template: "%s | Swiftcalcfy",
  },
  description:
    "Free online calculators for finance, construction, health, education, and everyday calculations. Explore practical tools with clear formulas, examples, and explanations.",
  alternates: {
    canonical: "https://swiftcalcfy.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Swiftcalcfy | Free Online Calculators",
    description:
      "Practical online calculators for finance, construction, health, education, and everyday calculations.",
    url: "https://swiftcalcfy.com/",
    siteName: "Swiftcalcfy",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <div className="max-w-7xl rounded-lg mx-auto px-3 py-4">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_260px] gap-4">
            <aside className="hidden md:block">
              <Sidebar />
            </aside>

            <main
              className={`min-h-[70vh] ${isCalculatorPage ? "" : "md:p-6"}`}
              style={{
                backgroundColor: "var(--surface)",
              }}>
              {children}
            </main>

            <aside className="hidden md:block">
              <RightSidebar />
            </aside>
          </div>
        </div>

        <Footer />
        {/* // Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9519915184026727"
          crossorigin="anonymous"></script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GKJDZ488MR"
          strategy="afterInteractive"
        />

        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GKJDZ488MR');
          `}
        </Script>
      </body>
    </html>
  );
}
