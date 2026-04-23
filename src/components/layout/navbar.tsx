"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                className={`fixed top-0 left-0 w-full px-5 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-5 text-white z-40 transition-all duration-300 ${
                    isScrolled || isOpen ? "bg-black/30 backdrop-blur-md border-b border-white/10" : "bg-transparent"
                }`}
            >
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-lg sm:text-xl">Agropunggur.id</h1>

                    <div className="hidden md:flex items-center font-medium space-x-5 lg:space-x-8">
                        <h2 className="font-bold">Beranda</h2>
                        <h2>Produk</h2>
                        <h2>Tentang Kami</h2>
                    </div>

                    <div className="hidden md:block">
                        <Button className="bg-[#46EC13] text-black font-bold text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-3 h-auto">
                            Contact
                        </Button>
                    </div>

                    <button
                        type="button"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 p-2 backdrop-blur-sm"
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
                        <button type="button" className="text-left" onClick={() => setIsOpen(false)}>
                            Beranda
                        </button>
                        <button type="button" className="text-left" onClick={() => setIsOpen(false)}>
                            Produk
                        </button>
                        <button type="button" className="text-left" onClick={() => setIsOpen(false)}>
                            Tentang Kami
                        </button>
                    </div>

                    <Button
                        className="bg-[#46EC13] text-black font-bold w-full h-12 text-base"
                        onClick={() => setIsOpen(false)}
                    >
                        Contact
                    </Button>
                </div>
            </div>
        </>
    )
}
