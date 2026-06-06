import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    const mappedOrder = {
      ...order,
      totalAmount: order.totalAmount ? Number(order.totalAmount) : null,
      items: order.items.map((item) => ({
        ...item,
        price: Number(item.price),
        product: item.product
          ? {
              ...item.product,
              price: Number(item.product.price),
              originalPrice: item.product.originalPrice
                ? Number(item.product.originalPrice)
                : undefined,
            }
          : null,
      })),
    };

    return NextResponse.json({
      success: true,
      data: mappedOrder,
    });
  } catch (error) {
    console.error("GET /api/orders/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}