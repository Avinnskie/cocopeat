import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { prisma, disconnectPrisma } from './lib/prisma.js'

const app = express()
const PORT = Number(process.env.PORT) || 4000

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())

// ─── Routes ──────────────────────────────────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Cocopeat Backend API is running',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/products'],
  })
})

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Cocopeat Backend API',
    timestamp: new Date().toISOString(),
  })
})

app.get('/api/products', async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: { benefits: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, products })
  } catch (error) {
    console.error('[GET /api/products]', error)
    res.status(500).json({ success: false, message: 'Failed to fetch products' })
  }
})

// ─── 404 Handler ─────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// ─── Global Error Handler ────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Unhandled Error]', err)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

// ─── Start Server ─────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})

// ─── Graceful Shutdown ────────────────────────────────────────
const shutdown = async (signal: string) => {
  console.log(`\n⚠️  ${signal} received. Shutting down gracefully...`)
  server.close(async () => {
    await disconnectPrisma()
    console.log('✅ Server closed.')
    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))