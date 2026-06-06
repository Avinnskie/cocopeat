import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { mapProduct } from "@/data/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const dbProduct = await prisma.product.findUnique({
      where: { slug },
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

    if (!dbProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    const product = mapProduct(dbProduct);

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("GET /api/products/[slug]:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
      },
      {
        status: 500,
      }
    );
  }
}