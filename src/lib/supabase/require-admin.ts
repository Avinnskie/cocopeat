import { NextResponse } from "next/server";
import type { SupabaseClient, User } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

export async function requireAdmin(
  supabase: SupabaseClient<Database>,
): Promise<{ user: User } | NextResponse> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  if (user.app_metadata?.role !== "admin") {
    return NextResponse.json(
      {
        success: false,
        message:
          "Forbidden: account is not admin. Visit /api/admin/whoami to debug.",
      },
      { status: 403 },
    );
  }

  return { user };
}
