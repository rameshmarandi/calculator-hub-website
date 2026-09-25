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
        <SiteShell>{children}</SiteShell>

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
