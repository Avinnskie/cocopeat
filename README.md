# Cocopeat

Next.js (App Router) + Supabase. A product showcase that redirects buyers to Shopee — no cart, no checkout, no order system.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4 + shadcn-style primitives
- Supabase (Postgres + Auth)
- `@supabase/ssr` for cookie-based server sessions
- bun for install + scripts

# Cocopeat Landing Page

Landing page pemasaran digital untuk produk **Cocopeat** milik **Kelompok Petani Muda Jaya**.  
Project ini dirancang sebagai etalase digital produk yang dapat diakses melalui **mobile** maupun **desktop**, dengan fokus pada promosi produk, informasi manfaat, katalog, dan direct order ke WhatsApp atau marketplace.

---

## Project Overview

Website ini bertujuan untuk:

- Menampilkan informasi produk cocopeat secara profesional
- Memperkenalkan manfaat dan nilai jual produk
- Memudahkan calon pembeli melakukan pemesanan
- Mendukung promosi digital melalui QR Code
- Mengoptimalkan pencarian lokal seperti:
  - `Media Tanam Pontianak`
  - `Cocopeat Kalimantan Barat`

---

## Main Features

- Hero section untuk branding produk
- Product catalog
- Informasi manfaat / kandungan / hasil riset
- Direct order ke WhatsApp
- Link ke marketplace
- Integrasi QR Code pada kemasan
- Responsive design
- SEO local optimized

---

## Tech Stack

Project ini dapat dikembangkan menggunakan stack berikut:

- **Frontend:** Next.js / React
- **Styling:** Tailwind CSS
- **Version Control:** Git & GitHub
- **Deployment:** Vercel / Netlify
- **Design Reference:** Figma / Notion

---

## Project Structure

Contoh struktur folder project:

```bash
cocopeat/
├── app/
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── data/
├── lib/
├── public/
│   ├── icons/
│   ├── images/
│   └── qr/
├── styles/
├── types/
├── .gitignore
├── README.md
├── package.json
└── tsconfig.json
```

Folder Description
	•	app/ → routing / page utama
	•	components/layout/ → komponen layout seperti navbar dan footer
	•	components/sections/ → section utama landing page seperti hero, katalog, CTA
	•	components/ui/ → komponen reusable kecil
	•	data/ → data statis seperti produk, FAQ, dan konten
	•	lib/ → helper function / utilities
	•	public/images/ → gambar produk dan aset visual
	•	public/qr/ → file QR Code
	•	styles/ → styling tambahan
	•	types/ → definisi type / interface

## Branch Strategy

Project ini menggunakan 3 branch utama agar workflow tetap sederhana dan rapi.

Branch List
	•	main → branch production, berisi versi final yang stabil
	•	staging → branch testing / preview sebelum production
	•	develop → branch utama untuk development

## Workflow Overview

Alur kerja project ini:
```bash
develop -> staging -> main
```

Penjelasan
	•	Semua development dilakukan di branch develop
	•	Jika perubahan di develop sudah cukup stabil, merge ke staging
	•	Jika hasil di staging sudah lolos testing, merge ke main

1. Mulai kerja di branch develop
```bash
git checkout develop
git pull origin develop
```

2. Lakukan perubahan project

Contoh:
	•	menambah hero section
	•	mengubah katalog produk
	•	memperbaiki responsive layout
	•	update konten landing page

3. Commit perubahan
```bash
git add .
git commit -m "feat: add hero section"
```

4. Push ke develop
```bash
git push origin develop
```

## Push dari branch develop ke staging
1. Pastikan develop terbaru
```bash
git checkout develop
git pull origin develop
```
2. Pindah ke staging
```bash
git checkout staging
git pull origin staging
```
3. Merge develop ke staging
```bash
git merge develop
```
4. Push hasil merge ke staging
```bash
git push origin staging
```

Setelah dari staging sudah di testing dan berjalan normal maka perubahan tersebut siap di push ke branch **Main**
Cara push ke branch main sama seperti push dari develop ke staging

## Full workflow example

**Development dilakukan di develop**
```bash
git checkout develop
git pull origin develop
git add .
git commit -m "feat: add product catalog section"
git push origin develop
```
**Naikkan ke branch staging**
```bash
git checkout staging
git pull origin staging
git merge develop
git push origin staging
```
**Naikkan ke Main**
```bash
git checkout main
git pull origin main
git merge staging
git push origin main
```

## Git Commit Message Standard
Agar riwayat commit rapi, konsisten, dan mudah dipahami, project ini menggunakan format commit message berikut:
```bash
type: short description
```

Contoh:
```bash
feat: add hero section
fix: fix mobile navbar layout
docs: update README git workflow
style: improve button spacing
refactor: simplify product card component
```

## Commit Types

**feat**
Digunakan untuk penambahan fitur baru
Contoh:
```bash
git commit -m "feat: add hero section"
git commit -m "feat: add whatsapp direct order button"
git commit -m "feat: add qr code section"
```

**fix**
Digunakan untuk memperbaiki bug atau error
Contoh:
```bash
git commit -m "fix: fix broken product image path"
git commit -m "fix: fix responsive layout on mobile"
git commit -m "fix: resolve footer spacing issue"
```

**docs**
Digunakan untuk perubahan dokumentasi
Contoh:
```bash
git commit -m "docs: update project README"
git commit -m "docs: add git workflow guide"
```

**style**
Digunakan untuk perubahan tampilan atau formating tanpa mengubah logic utama
Contoh:
```bash
git commit -m "style: improve card spacing"
git commit -m "style: update section typography"
git commit -m "style: adjust button radius"
```

**refactor**
Digunakan untuk merapikan atau menyusun ulang kode tanpa menambah fitur baru
Contoh:
```bash
git commit -m "refactor: simplify navbar component"
git commit -m "refactor: clean up section structure"
```

**chore**
Digunakan untuk pekerjaan kecil pendukung, konfigurasi, atau maintenance
Contoh:
```bash
git commit -m "chore: initialize project structure"
git commit -m "chore: update dependencies"
git commit -m "chore: add gitignore entries"
```

**test**
Digunakan jika menambahkan atau mengubah testing
Contoh:
```bash
git commit -m "test: add basic component test"
```

## Contoh paling utama
```bash
chore: initialize project structure
feat: add hero section
feat: add product catalog section
feat: add benefits section
feat: add direct order button
feat: add qr code information section
fix: fix broken image import
fix: fix mobile section spacing
style: improve typography hierarchy
style: update button styling
docs: update README project setup
docs: add git workflow section
refactor: clean up section component naming
```

---

## Getting Started

### 1. Install

```bash
bun install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | `https://<project>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | Anon key from Supabase Studio → API |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Service role secret. Server-only. Used to seed the admin user and clean up product images on delete. |
| `ADMIN_EMAIL` | yes | Default admin login (auto-seeded). |
| `ADMIN_PASSWORD` | yes | Default admin password (auto-seeded). |
| `NEXT_PUBLIC_SHOPEE_SHOP_URL` | no | Whole-shop Shopee link shown in navbar + CTA. Hidden when empty. |

### 3. Apply schema + storage bucket

In Supabase Studio → SQL Editor, run [`supabase_schema.sql`](./supabase_schema.sql). The script creates all tables and the `product-images` storage bucket (5 MB max, JPEG/PNG/WebP only, public). RLS is intentionally not configured — see the security note below.

If you upgraded from a prior deploy that had RLS enabled, also run `supabase_migrations/003_disable_rls.sql` and `supabase_migrations/004_open_storage_bucket.sql` to align with the current state.

If you previously deployed an older version of this project that had `Order` / `OrderItem` tables, run the migration block in the SQL file (commented out) to drop them and add the `shopeeUrl` column.

### 4. Run

```bash
bun run dev
```

Visit `http://localhost:3000`. The first time you hit `/login` and sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`, the app auto-creates that user in `auth.users` with `role=admin`. No signup form exists.

You can also force-seed without logging in:

```bash
curl -X POST http://localhost:3000/api/admin/seed
```

## How it works

### Public site (`/`, `/products`, `/products/[slug]`)

- Browses products from the `Product` table.
- Each product card has a **Beli di Shopee** button that opens `product.shopeeUrl` in a new tab. If `shopeeUrl` is empty, the button shows "Tidak tersedia" and is disabled.
- The detail page is informational; the only purchase path is the Shopee link.

### Admin (`/admin`)

- `/login` → enter admin email + password → land on `/admin`.
- `/admin/products` → table of all products + create/edit/delete actions.
- `/admin/products/new` → form to create a product. Required: `id`, `slug`, `name`, `image`, `shopeeUrl`.
- `/admin/products/[slug]/edit` → edit form pre-filled.

All `/admin/**` and `/api/admin/**` routes are gated by Next.js middleware + a `requireAdmin()` guard inside each route handler. **There is no second DB-level layer**: see the security note below.

> ### Security note
>
> Row Level Security is **disabled** on every public table. The `product-images` bucket has a fully permissive RLS policy. Other storage buckets keep Supabase's default-deny rules.
>
> The anon API key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) ships to the browser and grants:
>
> - full read/write/delete access to every row via direct PostgREST calls
> - full read/write/delete access to files inside the `product-images` bucket via direct Storage API calls
>
> Bypassing the Next.js app is unauthenticated. Bucket-level constraints (file size, allowed mime types) are the only DB-side protection on uploads.
>
> The application-layer admin guard is the only authorization. This is fine for a low-stakes redirector site with no sensitive data, but never store anything you wouldn't be comfortable having publicly readable and modifiable.

### Product images

Admins upload product images directly from their device (file picker, gallery, or camera on mobile). Files go straight to the Supabase Storage `product-images` bucket — never through the Next.js server. Constraints:

- Format: JPEG, PNG, or WebP
- Max size: 5 MB
- Public CDN URL is stored in `Product.image`

When an admin replaces an image while editing, the previous file is deleted from Storage. When a product is deleted via `DELETE /api/admin/products/[slug]`, its image is also removed from the bucket (best-effort; failure logs but does not block the delete).

### Auth

- Cookie-based via `@supabase/ssr` (HttpOnly, signed by Supabase).
- Admin role lives in `auth.users.raw_app_meta_data->>'role'`. `app_metadata` is service-role-only — users **cannot** modify it via `supabase.auth.updateUser()`.
- Login: `POST /api/auth/login`. Logout: `POST /api/auth/logout`. Whoami: `GET /api/auth/me`.

## API

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/products` | All products |
| GET | `/api/products/[slug]` | One product |
| POST | `/api/auth/login` | Sets session cookies |
| POST | `/api/auth/logout` | Clears session |
| GET | `/api/auth/me` | Current user + role |
| POST | `/api/admin/seed` | Idempotent admin user creation |
| POST | `/api/admin/products` | Create product |
| PATCH | `/api/admin/products/[slug]` | Update product |
| DELETE | `/api/admin/products/[slug]` | Delete product |

## Project layout

```
src/
  app/
    page.tsx                                  # Homepage (Hero, About, Catalog, CTA)
    products/                                 # Public catalog + detail
    admin/                                    # Admin dashboard
      products/{new, [slug]/edit}/page.tsx
    api/
      products/                               # Public read endpoints
      auth/{login, logout, me}/route.ts
      admin/{seed, products, products/[slug]}/route.ts
    (auth)/login/page.tsx                     # Login form (admin only — no signup)
  components/
    admin/                                    # Admin-only client components
    layout/, sections/, organisms/, ...       # Public site UI
  lib/
    env.ts                                    # Env var validation
    supabase/{server, browser, middleware, admin}.ts
    seed-admin.ts                             # Idempotent ensureAdminUser()
    utils.ts
  middleware.ts                               # Gates /admin/** and /api/admin/**
  types/database.ts                           # Supabase Database type
supabase_schema.sql                           # Source-of-truth DDL + RLS
```

## Notes

- The legacy Express server in `src/index.ts` is unmaintained and references deleted Prisma modules. Ignore or delete it.
- There is no order/checkout system. Adding one would require restoring `Order` / `OrderItem` tables (their DDL is in git history).
