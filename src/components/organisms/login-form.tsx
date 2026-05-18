"use client";

import * as React from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type LoginFormProps = {
  className?: string;
};

type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

function LoginForm({ className }: LoginFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!password) {
      newErrors.password = "Password wajib diisi";
    } else if (password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("w-full space-y-5", className)}
    >
      {errors.general && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 rounded-xl border border-red-200 bg-red-50"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-sm text-red-700">{errors.general}</div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="admin-email">Email Admin</Label>
        <div className="relative">
          <Mail
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="admin-email"
            type="email"
            autoComplete="email"
            placeholder="admin@agropunggur.id"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              "w-full h-12 pl-11 pr-4 rounded-xl border bg-white text-sm text-gray-900 placeholder:text-gray-400 transition-all outline-none",
              "focus:border-[#46EC13] focus:ring-4 focus:ring-[#46EC13]/15",
              errors.email
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                : "border-gray-200 hover:border-gray-300",
            )}
          />
        </div>
        {errors.email && (
          <p
            id="email-error"
            className="flex items-center gap-1.5 text-xs text-red-600"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="admin-password">Password</Label>
        <div className="relative">
          <Lock
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Masukkan password admin"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors({ ...errors, password: undefined });
            }}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={cn(
              "w-full h-12 pl-11 pr-12 rounded-xl border bg-white text-sm text-gray-900 placeholder:text-gray-400 transition-all outline-none",
              "focus:border-[#46EC13] focus:ring-4 focus:ring-[#46EC13]/15",
              errors.password
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                : "border-gray-200 hover:border-gray-300",
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46EC13]"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p
            id="password-error"
            className="flex items-center gap-1.5 text-xs text-red-600"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.password}
          </p>
        )}
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer select-none group">
        <span className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className={cn(
              "size-4 rounded border-2 transition-all duration-200",
              "peer-focus-visible:ring-3 peer-focus-visible:ring-[#46EC13]/30",
              rememberMe
                ? "bg-[#46EC13] border-[#46EC13]"
                : "bg-white border-gray-300 group-hover:border-gray-400",
            )}
          />
          {rememberMe && (
            <svg
              className="absolute w-3 h-3 text-black pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </span>
        <span className="text-sm text-gray-700">
          Tetap masuk pada perangkat ini
        </span>
      </label>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold text-sm rounded-xl shadow-lg shadow-[#46EC13]/20 hover:shadow-[#46EC13]/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
              />
            </svg>
            Memverifikasi...
          </>
        ) : (
          <>
            Masuk ke Dashboard
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
}

export { LoginForm };
