import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

// Endpoint GET
export async function GET() {
  try {
    const products = await prisma.product.findMany(); // Ganti 'product' sesuai schema
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}