"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import { usePathname } from "next/navigation";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Detect calculator detail page
  const isCalculatorPage = pathname.includes("-calculator");

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
              }}
            >
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
          crossorigin="anonymous"
        ></script>

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
