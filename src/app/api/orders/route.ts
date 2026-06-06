import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const mappedOrders = orders.map((order) => ({
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
    }));

    return NextResponse.json({
      success: true,
      data: mappedOrders,
    });
  } catch (error) {
    console.error("GET /api/orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, platform, items } = body;

    if (!platform || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        const price = Number(product.price);
        const itemTotal = price * item.quantity;
        totalAmount += itemTotal;

        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }

      return tx.order.create({
        data: {
          customerName,
          customerPhone,
          platform,
          totalAmount,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });
    });

    const mappedOrder = {
      ...order,
      totalAmount: Number(order.totalAmount),
      items: order.items.map((item) => ({
        ...item,
        price: Number(item.price),
      })),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        data: mappedOrder,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error("POST /api/orders:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create order",
      },
      {
        status: 500,
      }
    );
  }
}