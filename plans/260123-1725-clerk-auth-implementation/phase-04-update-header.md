# Phase 4: Update Header with Auth UI

**Priority**: P1
**Status**: Pending
**Effort**: 1 hour

## Overview

Update the Header component to display authentication state, sign-in/sign-up buttons for unauthenticated users, and user profile menu for authenticated users.

## Context Links

- Current Header: `/components/Header.tsx`
- [useAuth Hook](https://clerk.com/docs/references/react/useauth)
- [UserButton Component](https://clerk.com/docs/components/user-button)
- [SignIn/SignUp Buttons](https://clerk.com/docs/components/sign-in-and-sign-up-buttons)

## Key Insights

- **useAuth()** hook provides auth state in client components
- **UserButton** provides pre-built user menu with profile/sign-out
- **SignedIn/SignedOut** conditionally render content
- **Maintain existing header styling** for consistency
- **Preserve navigation links** and structure

## Requirements

### Functional
- Show "Đăng nhập" button when unauthenticated
- Show user avatar/menu when authenticated
- Sign-in redirects to /sign-in page
- Sign-up redirects to /sign-up page
- User menu includes profile and sign-out options
- Display user name/email when possible

### Non-Functional
- Maintain existing header design
- Fast authentication state loading
- Mobile responsive
- TypeScript types

## Architecture

```
Header (Client Component)
├── Navigation (existing)
└── Auth Section (new)
    ├── SignedOut
    │   ├── Đăng nhập button
    │   └── Đăng ký button (optional)
    └── SignedIn
        └── UserButton (avatar + dropdown)
```

## Related Code Files

### Files to Modify
- **components/Header.tsx** - Add auth UI

### Files to Reference
- **Existing Header.tsx** - Preserve design
- **Auth pages** - Link destinations

## Implementation Steps

### 1. Update Header Component

Modify `components/Header.tsx`:
```typescript
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function Header() {
  const pathname = usePathname();
  const { isLoaded } = useAuth();

  const isActive = (path: string) => pathname === path;

  // Don't render auth state until loaded to avoid flash
  if (!isLoaded) {
    return null;
  }

  return (
    <header className="fixed top-4 left-4 right-4 md:left-6 md:right-6 lg:left-8 lg:right-8 z-50 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-2xl shadow-xl shadow-primary/5 px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-hover p-0.5 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 cursor-pointer">
                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Bản Đồ Xây Nhà AI"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight font-display">
                  Bandoxaynha<span className="text-primary">.ai</span>
                </h1>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/thiet-ke-noi-that"
                className={`
                  text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer
                  ${isActive("/thiet-ke-noi-that")
                    ? "text-white bg-gradient-to-r from-primary to-primary-hover shadow-lg shadow-primary/30 border border-primary/40"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:border-slate-200 border border-transparent"
                  }
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                Thiết kế nội thất
              </Link>
              <Link
                href="/agents"
                className={`
                  text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer
                  ${isActive("/agents") || pathname.startsWith("/agents/")
                    ? "text-white bg-gradient-to-r from-primary to-primary-hover shadow-lg shadow-primary/30 border border-primary/40"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:border-slate-200 border border-transparent"
                  }
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Tiện ích AI
              </Link>
              <Link
                href="/nha-thau"
                className={`
                  text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer
                  ${isActive("/nha-thau") || pathname.startsWith("/nha-thau/")
                    ? "text-white bg-gradient-to-r from-primary to-primary-hover shadow-lg shadow-primary/30 border border-primary/40"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:border-slate-200 border border-transparent"
                  }
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Danh sách nhà thầu
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <SignedOut>
              <Link
                href="/sign-in"
                className="px-5 py-2.5 text-sm font-semibold text-primary bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 border border-primary/30 hover:border-primary/50 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-primary/20 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Đăng nhập
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-all"
                >
                  Dashboard
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-xl",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
```

## Todo List

- [ ] Add useAuth hook to Header
- [ ] Wrap auth buttons in SignedOut component
- [ ] Add UserButton in SignedIn component
- [ ] Add dashboard link for authenticated users
- [ ] Configure UserButton appearance
- [ ] Handle loading state to avoid flash
- [ ] Test sign-in/sign-out flow
- [ ] Verify mobile responsiveness

## Success Criteria

- Header shows sign-in button when logged out
- Header shows user avatar when logged in
- User menu opens on avatar click
- Sign-out works correctly
- Dashboard link appears for authenticated users
- No flash of unauthenticated state
- Preserves existing header styling
- Works on mobile and desktop

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Flash of wrong state | Low | Check isLoaded before render |
- **UserButton styling**: Match header design
- **Loading state**: Prevent layout shift

## Next Steps

Proceed to [Phase 5: Implement Route Protection](./phase-05-protect-routes.md)

**Dependencies**: Phase 3 (Auth pages exist)
**Blocks**: Phase 6 (Protected pages need middleware)
