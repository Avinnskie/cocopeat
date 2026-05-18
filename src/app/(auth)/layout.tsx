import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - Agropunggur.id",
  description:
    "Halaman akses administrator Agropunggur.id untuk mengelola produk, pesanan, dan data kemitraan petani.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-[#F6F8F6]">{children}</main>;
}
