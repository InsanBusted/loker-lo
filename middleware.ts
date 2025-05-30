import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/user(.*)"]);

// Buat daftar public route
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/tentang(.*)",
  "/ketentuan(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const url = req.nextUrl.clone();

  if (userId) {
    // Jika user sudah login dan akses public route → redirect ke /user
    if (isPublicRoute(req)) {
      url.pathname = "/user";
      return NextResponse.redirect(url);
    }
  } else {
    // Jika user belum login dan akses protected route → redirect ke sign-in
    if (isProtectedRoute(req)) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
