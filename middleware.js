import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^/]*.(?:html|js|css|png|jpg|jpeg|gif|svg|ico|map|txt|json)$).*)",
  ],
};
