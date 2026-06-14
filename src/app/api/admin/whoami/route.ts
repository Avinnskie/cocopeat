import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      {
        success: false,
        signedIn: false,
        message: userError?.message ?? "No active session",
      },
      { status: 401 },
    );
  }

  return NextResponse.json({
    success: true,
    signedIn: true,
    user: {
      id: user.id,
      email: user.email,
      app_metadata: user.app_metadata,
      user_metadata: user.user_metadata,
    },
    isAdminViaJwt: user.app_metadata?.role === "admin",
  });
}
