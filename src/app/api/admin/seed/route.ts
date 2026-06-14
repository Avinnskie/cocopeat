import { NextResponse } from "next/server";

import { ensureAdminUser } from "@/lib/seed-admin";

export async function POST() {
  const result = await ensureAdminUser();
  if (!result.ok) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ success: true, message: result.message });
}

export async function GET() {
  return POST();
}
