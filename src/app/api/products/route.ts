import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Import dari Langkah 1

// Endpoint GET: Setara dengan membuat route GET di backend terpisah
export async function GET() {
  try {
    const products = await prisma.product.findMany(); // Ganti 'product' sesuai schema-mu
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}