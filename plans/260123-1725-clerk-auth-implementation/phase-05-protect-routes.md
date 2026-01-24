# Phase 5: Implement Route Protection

**Priority**: P1
**Status**: Pending
**Effort**: 1 hour

## Overview

Create Next.js middleware to protect routes and redirect unauthenticated users to sign-in page.

## Context Links

- [Clerk Middleware Guide](https://clerk.com/docs/references/nextjs/clerk-middleware)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## Key Insights

- **Middleware runs** before page renders, for auth checks
- **auth() helper** works in middleware for session validation
- **Redirect** to sign-in for protected routes
- **Public routes** accessible without auth
- **Middleware file** must be at project root

## Requirements

### Functional
- Protect /dashboard route
- Protect /saved-designs route
- Redirect unauthenticated to /sign-in
- Allow access to /sign-in, /sign-up
- Allow public access to all other routes

### Non-Functional
- Fast middleware execution
- No unnecessary redirects
- Type-safe implementation

## Architecture

```
Request → Middleware → Route Decision
├── Protected route + Not authenticated → /sign-in
├── Public route → Allow
└── Sign-in/sign-up → Allow
```

## Related Code Files

### Files to Create
- **middleware.ts** - Route protection logic

### Files to Reference
- **Auth pages** - Redirect destination
- **Protected pages** - Routes to protect

## Implementation Steps

### 1. Create Middleware

Create `middleware.ts` at project root:
```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/saved-designs(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    // Redirect unauthenticated users to sign-in
    auth().protect();
  }
});

export const config = {
  // Protect all routes except:
  // - _next (Next.js internals)
  // - static files (images, fonts, etc)
  // - sign-in, sign-up
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

### 2. Alternative: Custom Redirect Logic

If need more control over redirects:
```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/saved-designs(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/(.*)", // Allow all other routes
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    if (!auth().userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

## Todo List

- [ ] Create middleware.ts at root
- [ ] Define protected routes
- [ ] Configure auth().protect()
- [ ] Set up matcher configuration
- [ ] Test protected route redirects
- [ ] Test public route access
- [ ] Test sign-in/sign-up access
- [ ] Verify TypeScript types

## Success Criteria

- Unauthenticated users redirected from /dashboard to /sign-in
- Authenticated users can access /dashboard
- Public routes work without auth
- Sign-in/sign-up accessible without auth
- No errors in middleware execution
- TypeScript types correct

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Over-protected routes | Medium | Test all routes |
| Middleware performance | Low | Keep logic simple |
- **Protected routes**: Add more as needed
- **Public routes**: Allow landing page, agents, etc.

## Next Steps

Proceed to [Phase 6: Create Protected Pages](./phase-06-create-protected-pages.md)

**Dependencies**: Phase 4 (Header has auth links)
**Blocks**: Phase 6 (Middleware protects routes)
