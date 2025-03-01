import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {roleRoutes, routeAccessMap } from "./lib/settings";
import { Role } from "@prisma/client";



export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const secret = process.env["AUTH_SECRET"];

  console.log(secret, "secret");
  
  const token = await getToken({ req, secret: process.env["AUTH_SECRET"] });
  const isLoggedIn = !!token;
  
  const role = token?.["role"];
  const authPath = "sign-in";

  console.log(token, "token", role, "role", pathname, "pathname");

//allow static files
  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/public") || 
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|mp3|woff|woff2|ttf|otf)$/) 
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page
  if (!isLoggedIn) {
    if (!pathname.startsWith(`/${authPath}`)) {
      const redirectUrl = `${origin}/${authPath}`;
      return NextResponse.redirect(new URL(redirectUrl));
    }
    return NextResponse.next();
  }

  // Redirect logged-in users away from the login page
  if (isLoggedIn && (pathname === "/sign-in" || pathname === "/")) {
    const rolePath = role ? roleRoutes[role as keyof typeof roleRoutes] : "student";
    if (pathname !== rolePath) {
      const redirectUrl = `${origin}${rolePath}`;
      return NextResponse.redirect(new URL(redirectUrl));
    }
  }

  // Role-based access control
  const matchers = Object.keys(routeAccessMap).map((route) => ({
    matcher: (path: string) => path.startsWith(route),
    allowedRoles: routeAccessMap[route],
  }));

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(pathname)) {

      if (!role || !allowedRoles.includes(role as Role)) {
        const rolePath = role ? roleRoutes[role as keyof typeof roleRoutes] : "student";
        if (pathname !== `/${rolePath}`) {
          const newUrl = req.nextUrl.clone();
          newUrl.pathname = `/${rolePath}`;
          return NextResponse.redirect(newUrl);
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico|public/.*).*)"],
};
