# Setup Backend & Database Supabase

Panduan singkat untuk menyelaraskan environment lokal dengan Supabase project.

## 1. Environment Variables

```bash
cp .env.example .env
```

Variabel yang dibutuhkan:

```env
NEXT_PUBLIC_SUPABASE_URL="https://<project-ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"   # SERVER-ONLY
ADMIN_EMAIL="admin@agropunggur.id"
ADMIN_PASSWORD="ChangeMe123!"
NEXT_PUBLIC_SHOPEE_SHOP_URL=""                   # opsional
```

Service role key didapat dari Supabase Studio → Project Settings → API → `service_role` secret. Jangan commit, jangan kirim ke client.

## 2. Apply Schema + Storage

Buka Supabase Studio → SQL Editor → paste isi `supabase_schema.sql` → Run. Script ini juga membuat bucket `product-images` (5 MB, JPEG/PNG/WebP, public read, admin write).

Untuk project yang sudah pernah deploy versi lama (dengan tabel `Order`/`OrderItem`), jalankan blok migrasi yang tersedia (di-comment) di bagian bawah file untuk drop tabel order lama dan menambahkan kolom `shopeeUrl`.

Verifikasi bucket setelah dijalankan: Storage → daftar bucket harus berisi `product-images` dengan flag `Public` dan size limit 5 MB.

## 3. Seed Admin

Tidak perlu langkah manual. Saat `bun run dev` dijalankan dan seseorang memanggil `POST /api/auth/login` (atau `POST /api/admin/seed`), aplikasi otomatis:

1. Cek apakah user dengan `ADMIN_EMAIL` sudah ada di `auth.users`.
2. Jika belum ada → create user dengan password = `ADMIN_PASSWORD` dan `app_metadata.role = "admin"`.
3. Jika sudah ada tapi belum admin → promote ke admin.
4. Cache hasil supaya call berikutnya tidak hit lagi.

Service role client yang dipakai untuk seeding di-encapsulate di `src/lib/supabase/admin.ts` — hanya bisa dipanggil dari server-side code (`import "server-only"`).

## 4. API Routes

### Public

| Method | Path | Catatan |
| --- | --- | --- |
| GET | `/api/products` | List semua produk + relasi |
| GET | `/api/products/[slug]` | Detail by slug |

### Auth

| Method | Path | Catatan |
| --- | --- | --- |
| POST | `/api/auth/login` | Body: `{email, password}` → sets cookies |
| POST | `/api/auth/logout` | Clears session |
| GET | `/api/auth/me` | Current user + role atau 401 |

### Admin (gated by middleware + RLS)

| Method | Path | Catatan |
| --- | --- | --- |
| POST | `/api/admin/seed` | Idempotent ensureAdminUser() |
| POST | `/api/admin/products` | Body: `{id, slug, name, image, shopeeUrl, ...}` |
| PATCH | `/api/admin/products/[slug]` | Body: `Partial<Product>` |
| DELETE | `/api/admin/products/[slug]` | Cascade ke semua relasi |

## 5. Catatan Teknis

- **Image uploads**: Admin form mengupload langsung dari browser ke bucket `product-images` via supabase-js (`supabase.storage.from('product-images').upload()`). Auth-nya pakai cookie session admin yang sama dengan PostgREST request. Tidak ada multipart endpoint di Next.js. URL public hasil upload disimpan di kolom `Product.image`. Saat admin replace gambar / delete produk, file lama otomatis dihapus dari bucket (best-effort).
- **Decimal mapping**: Kolom `price`, `originalPrice` dikembalikan PostgREST sebagai string. Selalu pakai `mapProduct()` dari `@/data/products` untuk konversi ke `number`.
- **Embedded selects**: `PRODUCT_RELATIONS_SELECT` di `src/data/products.ts` — satu sumber relasi yang di-include.
- **Auth & cookies**: RSC + route handlers pakai `createClient()` dari `@/lib/supabase/server`. Client components pakai `@/lib/supabase/browser`.
- **RLS DISABLED di tabel public**: Tidak ada Row Level Security di tabel `Product` dan relasinya. Bucket `product-images` punya satu policy permisif yang sama efeknya. Bucket storage lain di project ini tetap pakai default-deny RLS Supabase. Anon key membuka full read/write/delete ke semua tabel public + bucket `product-images`. Satu-satunya proteksi adalah `requireAdmin()` di setiap route handler `/api/admin/**` + middleware. Bypass Next.js (curl langsung ke Supabase REST/Storage endpoint) = unauthenticated. Bucket size limit + allowed mime types tetap berlaku tapi itu satu-satunya filter di sisi DB. Jangan simpan data sensitif.
- **Middleware**: `src/middleware.ts` blokir `/admin/**` dan `/api/admin/**` untuk non-admin sebelum route handler. Ini adalah **satu-satunya** lapisan otorisasi.
- **Tipe**: `Database` di `src/types/database.ts`. Kalau menambah kolom Postgres, update tipe ini supaya autocomplete bekerja.
