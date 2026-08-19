import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LayoutShell } from "@/components/layout/layout-shell";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.cocopeat-plus.com"),

    title: {
        default: "Cocopeat Plus | Media Tanam Cocopeat Premium Indonesia",
        template: "%s | Cocopeat Plus",
    },

    description:
        "Cocopeat Plus menyediakan media tanam cocopeat premium dari serabut kelapa Indonesia untuk pertanian, hidroponik, pembibitan, dan hortikultura.",

    openGraph: {
        title: "Cocopeat Plus | Media Tanam Cocopeat Premium Indonesia",
        description:
            "Media tanam cocopeat premium dari serabut kelapa Indonesia untuk pertanian, hidroponik, pembibitan, dan hortikultura.",
        url: "/",
        siteName: "Cocopeat Plus",
        locale: "id_ID",
        type: "website",
        images: [
            {
                url: "/images/bg.png",
                alt: "Cocopeat Plus - Media Tanam Cocopeat Premium Indonesia",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Cocopeat Plus | Media Tanam Cocopeat Premium Indonesia",
        description:
            "Media tanam cocopeat premium dari serabut kelapa Indonesia untuk pertanian, hidroponik, pembibitan, dan hortikultura.",
        images: ["/images/bg.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="id"
            className={cn(
                "h-full",
                "antialiased",
                poppins.variable,
                "font-sans",
                geist.variable,
            )}
        >
            <body className="min-h-full flex flex-col">
                <LayoutShell>{children}</LayoutShell>
            </body>
        </html>
    );
}
