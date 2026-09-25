"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

import { usePathname } from "next/navigation";

export default function SiteShell({ children }) {
  const pathname = usePathname();

  const isHomepage = pathname === "/";

  const isCalculatorPage =
    pathname.includes("-calculator") || pathname.includes("calculator");

  const isCategoryPage =
    pathname === "/finance/" ||
    pathname === "/construction/" ||
    pathname === "/health/" ||
    pathname === "/education/" ||
    pathname === "/finance" ||
    pathname === "/construction" ||
    pathname === "/health" ||
    pathname === "/education";

  const useSidebarLayout = isCalculatorPage || isCategoryPage;

  return (
    <>
      <Header />

      {isHomepage ? (
        /* =========================
           HOMEPAGE
        ========================== */
        <main className="min-h-[70vh] w-full">{children}</main>
      ) : useSidebarLayout ? (
        /* =========================
           CALCULATOR / CATEGORY
        ========================== */
        <div className="mx-auto max-w-7xl px-3 py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,1fr)_260px]">
            <aside className="hidden md:block">
              <Sidebar />
            </aside>

            <main
              className={[
                "min-h-[70vh]",
                isCalculatorPage ? "" : "md:p-6",
              ].join(" ")}
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
      ) : (
        /* =========================
           COMPANY / LEGAL PAGES
        ========================== */
        <main
          className="min-h-[70vh] w-full"
          style={{
            backgroundColor: "var(--surface)",
          }}>
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}
