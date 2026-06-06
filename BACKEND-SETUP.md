# Panduan Setup Backend & Database Supabase (Prisma 7)

Panduan ini ditujukan untuk tim Backend Developer untuk menyelaraskan lingkungan pengembangan lokal dengan database **Supabase (PostgreSQL)** yang dikelola menggunakan **Prisma 7**.

> [!IMPORTANT]
> Koneksi database dilakukan secara langsung menggunakan standard PostgreSQL URI (`DATABASE_URL`). Kita **tidak memerlukan Supabase API Key atau Supabase Client SDK** di backend.

---

## Langkah-Langkah Setup Lokal

### 1. Salin Environment Variables
Salin file `.env.example` menjadi `.env` di root proyek Anda:
```bash
# Untuk macOS / Linux
cp .env.example .env

# Untuk Windows (PowerShell)
Copy-Item .env.example .env
```

Buka file `.env` tersebut dan konfigurasi variabel berikut:

```env
# 1. Koneksi Database Utama (Supabase Shared Instance)
DATABASE_URL="postgresql://postgres.rogrznluzdbakcyxnczx:[PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# 2. Opsional (Diperlukan jika ingin mengakses Supabase Client SDK di client-side)
NEXT_PUBLIC_SUPABASE_URL="https://rogrznluzdbakcyxnczx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[ANON_KEY]"
```
> [!NOTE]
> * Silakan hubungi DevOps/Administrator secara privat untuk mendapatkan nilai **`[PASSWORD]`** database dan **`[ANON_KEY]`**.
> * Karena database sudah disinkronkan langsung di Supabase cloud oleh tim DevOps, Anda **tidak perlu** melakukan `prisma db push` atau `prisma migrate`.

### 2. Generate Prisma Client
Generasikan Prisma Client di lokal agar definisi model (`Product`, `Order`, dll.) dan auto-complete TypeScript aktif:
```bash
bunx prisma generate
```

### 3. Database Seeding (Opsional)
Jika Anda perlu mengisi ulang atau memperbarui data produk dummy/awal di database Supabase bersama, jalankan:
```bash
bunx prisma db seed
```
*(Perintah ini akan menjalankan script di `prisma/seed.ts` menggunakan konfigurasi di `prisma.config.ts`).*

### 4. Jalankan Server Lokal
Nyalakan server Next.js lokal Anda:
```bash
bun run dev
```

---

## Panduan Teknis & Implementasi

*   **Rute API Live**: Rute API berikut sudah live terhubung ke database Supabase Anda:
    *   `GET /api/products` (Mengambil semua produk)
    *   `GET /api/products/[slug]` (Detail produk berdasarkan slug)
    *   `GET /api/orders` (Mengambil daftar order)
    *   `POST /api/orders` (Membuat order baru dengan Prisma Transaction)
    *   `GET /api/orders/[id]` (Detail order berdasarkan ID)
*   **Decimal Mapping**: Kolom harga (`price` & `originalPrice`) dari database bertipe `Decimal`. Sebelum mengirimkan respons JSON ke frontend, pastikan untuk menggunakan helper `mapProduct` dari `@/data/products` agar tipenya dikonversi menjadi `number` secara aman.
