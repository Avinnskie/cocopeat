import "server-only";

import { env } from "@/lib/env";
import { createServiceClient } from "@/lib/supabase/admin";

let cached: Promise<{ ok: boolean; message: string }> | null = null;

export async function ensureAdminUser() {
  if (cached) return cached;
  cached = run();
  return cached;
}

async function run(): Promise<{ ok: boolean; message: string }> {
  const supabase = createServiceClient();

  const { data: list, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (listError) {
    cached = null;
    return { ok: false, message: listError.message };
  }

  const existing = list.users.find((u) => u.email === env.ADMIN_EMAIL);

  if (existing) {
    if (existing.app_metadata?.role !== "admin") {
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        existing.id,
        { app_metadata: { ...existing.app_metadata, role: "admin" } },
      );
      if (updateError) {
        cached = null;
        return { ok: false, message: updateError.message };
      }
      return { ok: true, message: "Existing user promoted to admin." };
    }
    return { ok: true, message: "Admin user already present." };
  }

  const { error: createError } = await supabase.auth.admin.createUser({
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
    email_confirm: true,
    app_metadata: { role: "admin" },
  });
  if (createError) {
    cached = null;
    return { ok: false, message: createError.message };
  }

  return { ok: true, message: "Admin user created." };
}
