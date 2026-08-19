import { Globe, ExternalLink } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white mt-10">
            <div className="px-5 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div className="space-y-3">
                        <h3 className="font-bold text-lg">Cocopeat+</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Memberdayakan petani, menghijaukan dunia. Media
                            tanam organik 100% untuk pertanian berkelanjutan.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-base">Shop</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Semua Produk
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Best Sellers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Bulk Orders
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-base">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Informasi pengiriman
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-base">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-foreground transition-colors"
                                >
                                    cocopeat+
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@cocopeatplus.com"
                                    className="hover:text-foreground transition-colors"
                                >
                                    support@cocopeatplus.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 px-5 sm:px-8 md:px-12 lg:px-20 py-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © 2025 Cocopeat+. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Globe className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
