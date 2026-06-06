# Cocopeat

Next.js (App Router) + Express API + Prisma / PostgreSQL.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment setup

Copy the env contract to a local `.env`:

```powershell
# Windows (PowerShell)
Copy-Item .env.example .env
```

```bash
# macOS / Linux
cp .env.example .env
```

Then open `.env` and fill in real values. At minimum, `DATABASE_URL` must be set — the app validates this at startup and fails fast with a clear error if missing.

**Required variables** (fail-fast on missing):

| Variable       | Purpose                                                          |
| -------------- | ---------------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma + `pg` Pool adapter. |

**Optional variables** (with defaults):

| Variable       | Default                 | Purpose                                  |
| -------------- | ----------------------- | ---------------------------------------- |
| `PORT`         | `4000`                  | Express API port (`src/index.ts`).       |
| `FRONTEND_URL` | `http://localhost:3000` | CORS allowed origin for the Express API. |
| `NODE_ENV`     | `development`           | Usually set by tooling.                  |

`NEXT_PUBLIC_*` variables are inlined into the browser bundle — never put secrets there. Add new ones to both `.env.example` and your local `.env` when introduced.

See `.env.example` for the full contract. `.env` is gitignored; `.env.example` is tracked.

### 3. Generate Prisma client & run migrations

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run the dev servers

```bash
# Next.js (http://localhost:3000)
npm run dev

# Express API (http://localhost:4000) — separate terminal
# Entry: src/index.ts
```

## Project Layout

```
src/
  app/                 # Next.js App Router
    api/products/      # Route handler
  components/          # UI, sections, layout
  lib/
    env.ts             # Env var validation & typed access
    prisma.ts          # Prisma client singleton
    utils.ts
  data/                # Static data
  index.ts             # Express API entry
prisma/
  schema.prisma        # Datasource + models
.env.example           # Env var contract (tracked)
.env                   # Local secrets (gitignored)
```

## Scripts

```bash
npm run dev     # Next.js dev server
npm run build   # Production build
npm run start   # Production server
npm run lint    # ESLint
```

## Deployment

When deploying (Vercel, Railway, etc.), mirror every variable from `.env.example` in the provider's environment settings. `.env.example` is your deploy checklist.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

