"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/#about" },
  { label: "Products", href: "/products" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(!isHomePage);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const shouldUseLightNavbar = !isHomePage || window.scrollY > heroHeight - 120;

      setIsScrolled(window.scrollY > 10);
      setIsLightBackground(shouldUseLightNavbar);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHomePage]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full px-5 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-5 z-40 transition-all duration-300 ${
          isOpen
            ? "bg-black text-white border-b border-white/10"
            : isLightBackground
              ? "bg-white/90 text-black backdrop-blur-md border-b border-black/10 shadow-sm"
              : "bg-black text-white border-b border-white/10"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href={'/'}>
          <h1 className="font-bold text-lg sm:text-xl">Agropunggur.id</h1>
          </Link>

          <div className="hidden md:flex items-center font-medium space-x-5 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors ${
                  !isOpen && isLightBackground ? "hover:text-black/70" : "hover:text-white/80"
                } ${link.label === "Beranda" ? "font-bold" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            {process.env.NEXT_PUBLIC_SHOPEE_SHOP_URL && (
              <Button
                asChild
                className="bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold text-sm sm:text-base px-5 py-2.5 h-auto rounded-lg"
              >
                <a
                  href={process.env.NEXT_PUBLIC_SHOPEE_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Toko Shopee
                </a>
              </Button>
            )}
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden inline-flex items-center justify-center rounded-md border p-2 backdrop-blur-sm transition-colors ${
              !isOpen && isLightBackground
                ? "border-black/20 bg-black/5 text-black"
                : "border-white/20 bg-white/10 text-white"
            }`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-30 bg-black/80 backdrop-blur-xl transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col px-5 sm:px-8 pt-24 pb-8 text-white">
          <div className="flex flex-1 flex-col items-start justify-center gap-6 text-2xl font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-left"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {process.env.NEXT_PUBLIC_SHOPEE_SHOP_URL && (
            <Button
              asChild
              className="bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold w-full h-12 text-base"
              onClick={() => setIsOpen(false)}
            >
              <a
                href={process.env.NEXT_PUBLIC_SHOPEE_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Toko Shopee
              </a>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
