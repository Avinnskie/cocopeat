import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { ensureAdminUser } from "@/lib/seed-admin";

export async function POST(req: Request) {
  await ensureAdminUser();

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return NextResponse.json(
      { success: false, message: error?.message ?? "Invalid credentials" },
      { status: 401 },
    );
  }

  const role = (data.user.app_metadata?.role as string | undefined) ?? null;

  return NextResponse.json({
    success: true,
    data: {
      user: {
        id: data.user.id,
        email: data.user.email,
        role,
      },
    },
  });
}
