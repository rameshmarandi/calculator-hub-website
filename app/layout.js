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

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Swiftcalcfy | Free Online Calculators",
    description:
      "Practical online calculators for finance, construction, health, education, and everyday calculations.",
    siteName: "Swiftcalcfy",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteShell>{children}</SiteShell>

        {/* Google AdSense Auto Ads */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9519915184026727"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GKJDZ488MR"
          strategy="afterInteractive"
        />

        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'G-GKJDZ488MR');
          `}
        </Script>
      </body>
    </html>
  );
}
