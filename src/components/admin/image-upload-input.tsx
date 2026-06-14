"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, Loader2, X, AlertCircle } from "lucide-react";

import { createClient } from "@/lib/supabase/browser";
import {
  PRODUCT_IMAGES_BUCKET,
  PRODUCT_IMAGE_ALLOWED_TYPES,
  PRODUCT_IMAGE_MAX_BYTES,
  buildProductImageObjectName,
  isAllowedImageType,
} from "@/lib/supabase/storage";

type ImageUploadInputProps = {
  value: string;
  onChange: (publicUrl: string) => void;
  disabled?: boolean;
};

const ACCEPT_ATTR = PRODUCT_IMAGE_ALLOWED_TYPES.join(",");
const MAX_BYTES_LABEL = `${Math.round(PRODUCT_IMAGE_MAX_BYTES / 1024 / 1024)}MB`;

export function ImageUploadInput({
  value,
  onChange,
  disabled,
}: ImageUploadInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const supabase = React.useMemo(() => createClient(), []);

  const handleFile = async (file: File) => {
    setError(null);

    if (!isAllowedImageType(file.type)) {
      setError("Format harus JPEG, PNG, atau WebP.");
      return;
    }
    if (file.size > PRODUCT_IMAGE_MAX_BYTES) {
      setError(`Ukuran maksimal ${MAX_BYTES_LABEL}.`);
      return;
    }

    setUploading(true);
    try {
      const objectName = buildProductImageObjectName(file.name);
      const { error: uploadError } = await supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .upload(objectName, file, {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .getPublicUrl(objectName);

      onChange(data.publicUrl);
    } catch {
      setError("Gagal mengunggah gambar. Coba lagi.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
  };

  const clear = () => {
    setError(null);
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        onChange={onPick}
        disabled={disabled || uploading}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      {value ? (
        <div className="relative w-40 h-40">
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <Image
              src={value}
              alt="Pratinjau gambar produk"
              fill
              sizes="160px"
              className="object-cover"
              unoptimized
            />
          </div>
          <button
            type="button"
            onClick={clear}
            disabled={disabled || uploading}
            aria-label="Hapus gambar"
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-300 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="w-40 h-40 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400 text-xs">
          <Upload className="w-6 h-6 mb-1" />
          <span>Belum ada gambar</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || uploading}
          className="inline-flex items-center gap-2 px-4 h-10 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Mengunggah...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              {value ? "Ganti Gambar" : "Pilih Gambar"}
            </>
          )}
        </button>
        <span className="text-xs text-gray-500">
          JPEG/PNG/WebP, maks {MAX_BYTES_LABEL}
        </span>
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
