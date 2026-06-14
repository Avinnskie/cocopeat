export const PRODUCT_IMAGES_BUCKET = "product-images";

export const PRODUCT_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export const PRODUCT_IMAGE_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AllowedImageType = (typeof PRODUCT_IMAGE_ALLOWED_TYPES)[number];

export function isAllowedImageType(type: string): type is AllowedImageType {
  return (PRODUCT_IMAGE_ALLOWED_TYPES as readonly string[]).includes(type);
}

export function extractStoragePath(
  publicUrl: string | null | undefined,
): string | null {
  if (!publicUrl) return null;
  const marker = `/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  const rest = publicUrl.slice(idx + marker.length);
  return rest.length > 0 ? rest : null;
}

export function buildProductImageObjectName(originalName: string): string {
  const ext = originalName.split(".").pop()?.toLowerCase() ?? "bin";
  const safeExt = /^[a-z0-9]+$/.test(ext) ? ext : "bin";
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${stamp}-${rand}.${safeExt}`;
}
