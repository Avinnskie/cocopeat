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
  extractStoragePath,
  isAllowedImageType,
} from "@/lib/supabase/storage";

const ACCEPT_ATTR = PRODUCT_IMAGE_ALLOWED_TYPES.join(",");
const MAX_BYTES_LABEL = `${Math.round(PRODUCT_IMAGE_MAX_BYTES / 1024 / 1024)}MB`;

export function ImageGalleryInput({
  values,
  onChange,
  disabled,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}) {
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
      onChange([...values, data.publicUrl]);
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

  const removeAt = async (idx: number) => {
    const url = values[idx];
    onChange(values.filter((_, i) => i !== idx));
    const path = extractStoragePath(url);
    if (path) {
      try {
        await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path]);
      } catch {
        /* best-effort cleanup */
      }
    }
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

      {values.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {values.map((url, idx) => (
            <div key={url + idx} className="relative w-24 h-24">
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src={url}
                  alt={`Galeri ${idx + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <button
                type="button"
                onClick={() => removeAt(idx)}
                disabled={disabled || uploading}
                aria-label={`Hapus gambar ${idx + 1}`}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-300 transition-colors disabled:opacity-50"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
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
              Tambah gambar galeri
            </>
          )}
        </button>
        <span className="text-xs text-gray-500">
          JPEG/PNG/WebP, maks {MAX_BYTES_LABEL} per gambar
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
