import { NextResponse, type NextRequest } from "next/server";

import { updateSession, isAdmin } from "@/lib/supabase/middleware";

const ADMIN_PAGE_PREFIX = "/admin";
const ADMIN_API_PREFIX = "/api/admin";
const DIAGNOSTIC_PATHS = ["/api/admin/whoami", "/api/admin/seed"];

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith(ADMIN_PAGE_PREFIX);
  const isAdminApi = pathname.startsWith(ADMIN_API_PREFIX);

  if (!isAdminPage && !isAdminApi) {
    return response;
  }

  if (DIAGNOSTIC_PATHS.includes(pathname)) {
    return response;
  }

  if (!user) {
    if (isAdminApi) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isAdmin(user)) {
    if (isAdminApi) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
