---
title: "Clerk Authentication Implementation"
description: "Implement complete Clerk auth system with Google OAuth and email/password for Next.js 16 app"
status: pending
priority: P1
effort: 9h
branch: main
tags: [auth, frontend, security, feature]
created: 2026-01-23
---

# Clerk Authentication Implementation Plan

## Overview

Implement complete authentication system using Clerk for the "Bản Đồ Xây Nhà AI" Vietnamese home construction assistant platform. Includes Google OAuth, email/password authentication, protected routes, user profile management, and comprehensive error handling.

## Tech Stack

- **Framework**: Next.js 16.0.8 (App Router)
- **UI Library**: React 19.2.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Auth Provider**: Clerk (@clerk/nextjs)
- **Auth Methods**: Google OAuth + Email/Password

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Setup Clerk SDK & Environment | Completed | 1h | [phase-01](./phase-01-setup-clerk.md) |
| 2 | Integrate ClerkProvider | Pending | 0.5h | [phase-02](./phase-02-integrate-provider.md) |
| 3 | Create Auth Pages | Pending | 1.5h | [phase-03](./phase-03-create-auth-pages.md) |
| 4 | Update Header with Auth UI | Pending | 1h | [phase-04](./phase-04-update-header.md) |
| 5 | Implement Route Protection | Pending | 1h | [phase-05](./phase-05-protect-routes.md) |
| 6 | Create Protected Pages | Pending | 2h | [phase-06](./phase-06-create-protected-pages.md) |
| 7 | Add Error Handling | Pending | 0.5h | [phase-07](./phase-07-error-handling.md) |
| 8 | Test Authentication Flow | Pending | 1h | [phase-08](./phase-08-testing.md) |
| 9 | Documentation | Pending | 0.5h | [phase-09](./phase-09-documentation.md) |

## Dependencies

### External
- Clerk account with application configured
- Google OAuth app configured in Clerk dashboard
- Clerk Publishable Key and Secret Key

### Internal
- Existing Header.tsx component (will be modified)
- Root layout.tsx (will be modified)
- No existing auth system (greenfield)

## Key Decisions

### Why Clerk?
- **First-class Next.js 16 support** with App Router
- **Built-in OAuth providers** (Google, etc.)
- **Server-side auth helpers** for middleware and server components
- **Type-safe** with excellent TypeScript support
- **Pre-built UI components** or custom option
- **Vietnamese language support** for auth flows
- **Simple middleware pattern** for route protection

### Architecture Decisions
- **Middleware-based protection** for public/private routes
- **Server components** for authenticated data fetching
- **Client components** for auth UI (sign-in, sign-up modals)
- **Clerk components** for pre-built UI (faster implementation)
- **Custom profile component** for user display (brand consistency)

## Success Criteria

- Users can sign up/sign in with Google OAuth
- Users can sign up/sign in with email/password
- Protected routes redirect unauthenticated users to sign-in
- User profile displays in header when authenticated
- Dashboard accessible only to authenticated users
- Error handling for all auth failure scenarios
- All flows work in Vietnamese language
- TypeScript types properly configured

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Clerk API downtime | Medium | Implement fallback/error states |
| OAuth misconfiguration | Low | Follow Clerk docs, test thoroughly |
| Session management bugs | Medium | Use Clerk's built-in session management |
| Type errors | Low | Leverage Clerk's TypeScript types |
| UI inconsistency | Low | Follow existing design system |

## Files to Create

```
app/
  ├── sign-in/
  │   └── [[...sign-in]]/
  │       └── page.tsx          # Clerk sign-in page
  ├── sign-up/
  │   └── [[...sign-up]]/
  │       └── page.tsx          # Clerk sign-up page
  ├── dashboard/
  │   └── page.tsx              # Protected dashboard
  └── saved-designs/
      └── page.tsx              # Protected saved designs
components/
  ├── UserProfileButton.tsx     # User profile dropdown
  └── ProtectedRoute.tsx        # Optional wrapper component
middleware.ts                    # Route protection
.env.local                      # Environment variables
.env.example                    # Environment template
CLERK_SETUP.md                  # Setup documentation
```

## Files to Modify

```
app/layout.tsx                  # Add ClerkProvider
components/Header.tsx            # Add auth UI
package.json                    # Add @clerk/nextjs dependency
.gitignore                      # Ensure .env.local ignored
```

## Unresolved Questions

1. **Custom domain needed?** Using Clerk's default auth pages or custom subdomain?
2. **User data storage?** Additional user metadata beyond Clerk defaults?
3. **Email verification required?** Should users verify email before access?
4. **Social providers beyond Google?** Add Facebook, GitHub later?
5. **Session duration?** Default or custom session timeout?

---

**Next Steps**: Begin with [Phase 1: Setup Clerk SDK & Environment](./phase-01-setup-clerk.md)
