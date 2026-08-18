import Link from "next/link";
import { ArrowLeft, Leaf, ShieldCheck } from "lucide-react";

import { LoginForm } from "@/components/organisms/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F6] relative overflow-hidden">
      {/* <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(70, 236, 19, 0.15) 0%, transparent 45%), radial-gradient(circle at 85% 100%, rgba(22, 163, 74, 0.1) 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0F1F0A 1px, transparent 1px), linear-gradient(to bottom, #0F1F0A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      /> */}

      <header className="relative z-10 px-6 sm:px-10 lg:px-16 py-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#16A34A] transition-colors duration-200 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 sm:px-10 py-8 lg:py-12">
        <div className="w-full max-w-[440px]">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-900/5 p-7 sm:p-9">
            <div className="flex flex-col items-center text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
                Login Administrator
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                Masuk untuk mengelola produk, pesanan, dan data petani mitra
                Agropunggur.
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  );
}
