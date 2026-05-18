"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const HIDDEN_PREFIXES = ["/login", "/register", "/forgot-password"];

function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDDEN_PREFIXES.some((prefix) =>
    pathname?.startsWith(prefix),
  );

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export { LayoutShell };
