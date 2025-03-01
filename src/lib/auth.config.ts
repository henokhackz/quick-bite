import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByUsername } from "./actions/user.action";
import { signInSchema } from "./schema/schema";
import { comparePassword } from "./utils";
import { authRoutes, roleRoutes, routeAccessMap } from "./settings";

const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          console.error("No credentials provided");
          return null;
        }

        const { username, password } = await signInSchema.parseAsync(
          credentials
        );

        const user = await getUserByUsername(username);
        if (!user) {
          console.log("User not found");
          return null;
        }

        if (!user.hashedPassword) throw new Error("Password not set");

        const isValid = await comparePassword(password, user.hashedPassword);
        if (!isValid) {
          console.log("Invalid password");
          return null;
        }

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }: any) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      //  role based access control
      const matchers = Object.keys(routeAccessMap).map((route) => ({
        matcher: (pathname: any) => pathname.startsWith(route),
        allowedRoles: routeAccessMap[route],
      }));
      // Redirect logged-in users away from auth routes
      const role = auth?.user?.role;
      for (const { matcher, allowedRoles } of matchers) {
        if (matcher(pathname) && !allowedRoles.includes(role)) {
          const newUrl = new URL(nextUrl);
          const rolePath = role ? `${roleRoutes[role as keyof typeof roleRoutes]}` : "student";
          newUrl.pathname = `${rolePath}`;
          return Response.redirect(newUrl);
        }
      }

      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          const rolePath = role ? `${roleRoutes[role as keyof typeof roleRoutes]}` : "student";
          const newUrl = new URL(nextUrl);
          newUrl.pathname = `${rolePath}`;
          return Response.redirect(new URL(newUrl, nextUrl));
        }
        return true; // Allow access to auth pages if not logged in
      }

      // Allow access if the user is authenticated
      return isLoggedIn;
    },
    jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }: any) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  debug: true,
  pages: {
    signIn: "/sign-in",
  },
 
};

export default authConfig;
