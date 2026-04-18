This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or 
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
