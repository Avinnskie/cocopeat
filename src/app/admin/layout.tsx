import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { LayoutDashboard, Package } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/admin/logout-button";

export const metadata: Metadata = {
    title: "Admin – Cocopeat+",
    robots: { index: false, follow: false },
};

const NAV = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
];

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.app_metadata?.role !== "admin") {
        redirect("/login?redirect=/admin");
    }

    return (
        <div className="min-h-screen flex bg-[#F6F8F6]">
            <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col">
                <div className="px-6 py-5 border-b border-gray-200">
                    <Link href="/admin" className="font-bold text-lg">
                        Cocopeat Admin
                    </Link>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                        {user.email}
                    </p>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {NAV.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#46EC13]/10 hover:text-[#16A34A] transition-colors"
                            >
                                <Icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-3 border-t border-gray-200">
                    <LogoutButton />
                </div>
            </aside>

            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
