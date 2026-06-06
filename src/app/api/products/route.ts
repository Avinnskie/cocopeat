import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        specs: true,
        technicalSpecs: true,
        batchInfo: true,
        sustainability: true,
        applications: true,
        comparison: true,
        storage: true,
        farmerPartnership: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error("GET /api/products:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}

// TODO:
// ganti mock response dengan prism query kalo dh ade database url