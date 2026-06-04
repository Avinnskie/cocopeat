import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [],
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return NextResponse.json(
      {
        success: true,
        message: "Order received",
        data: body,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request",
      },
      {
        status: 400,
      }
    );
  }
}