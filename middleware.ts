import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/user(.*)",
  "/loker-lo(.*)",
]);

// Buat daftar public route
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const url = req.nextUrl.clone();

  if (userId) {
    // Jika user sudah login dan akses public route → redirect ke /user
    if (isPublicRoute(req)) {
      url.pathname = "/loker-lo";
      return NextResponse.redirect(url);
    }
  } else {
    if (isProtectedRoute(req)) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Pastikan middleware jalan di semua route kecuali beberapa static dan api routes
     * Contoh: kecualikan /api, /_next/static, /_next/image, favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/api/(.*)",
  ],
};
