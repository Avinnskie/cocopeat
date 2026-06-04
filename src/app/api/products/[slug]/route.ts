import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    return NextResponse.json({
      success: true,
      data: {
        slug,
      },
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