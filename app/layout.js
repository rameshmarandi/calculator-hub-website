import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import Script from "next/script";

export const metadata = {
  title: `Swiftcalcfy - Free Online Calculators`,
  description:
    "Free online calculators for finance, health, construction, education and more.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        //  className="bg-gray-100 text-gray-900"
        className={inter.className}
      >
        <Header />

        <div className="max-w-7xl mx-auto px-3 py-4">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_260px] gap-4">
            {/* LEFT SIDEBAR */}
            <aside className="hidden md:block">
              <Sidebar />
            </aside>

            {/* MAIN CONTENT */}
            {/* <main
              className="rounded-xl p-5 min-h-[70vh]"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
              // className="bg-white rounded p-4 min-h-[70vh]"
            >
              {children}
            </main> */}

            {/* ⚠️ ONLY CONTENT GOES HERE */}
            <main
              className="rounded-xl p-5 min-h-[70vh]"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {children}
            </main>

            {/* RIGHT SIDEBAR */}
            <aside className="hidden md:block">
              <RightSidebar />
            </aside>
          </div>
        </div>
        <Footer />
        {/* <!-- Google tag (gtag.js) --> */}
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
