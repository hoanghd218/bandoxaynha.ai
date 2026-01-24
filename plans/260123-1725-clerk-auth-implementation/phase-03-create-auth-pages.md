# Phase 3: Create Auth Pages

**Priority**: P1
**Status**: Pending
**Effort**: 1.5 hours

## Overview

Create sign-in and sign-up pages using Clerk's pre-built components with catch-all routes for Next.js App Router.

## Context Links

- [Clerk Sign-In Component](https://clerk.com/docs/components/sign-in)
- [Clerk Sign-Up Component](https://clerk.com/docs/components/sign-up)
- [App Router Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

## Key Insights

- **Catch-all routes** `[[...sign-in]]` handle all Clerk auth URLs
- **SignedOut** component shows content only when unauthenticated
- **SignedIn** component shows content only when authenticated
- **Redirect URLs** configured in environment variables
- **Custom styling** via appearance prop in components

## Requirements

### Functional
- Create /sign-in page with Clerk SignIn component
- Create /sign-up page with Clerk SignUp component
- Redirect unauthenticated users to sign-in
- Redirect after successful auth to dashboard
- Custom styling to match app design

### Non-Functional
- Fast page loads
- Mobile responsive
- TypeScript types
- Vietnamese language

## Architecture

```
app/
├── sign-in/
│   └── [[...sign-in]]/      # Catch-all route
│       └── page.tsx         # SignIn component
└── sign-up/
    └── [[...sign-up]]/      # Catch-all route
        └── page.tsx         # SignUp component
```

## Related Code Files

### Files to Create
- **app/sign-in/[[...sign-in]]/page.tsx** - Sign-in page
- **app/sign-up/[[...sign-up]]/page.tsx** - Sign-up page

### Files to Reference
- **app/page.tsx** - Landing page (for redirect logic)

## Implementation Steps

### 1. Create Sign-In Page

Create `app/sign-in/[[...sign-in]]/page.tsx`:
```typescript
import { SignIn, SignedOut, SignedIn, RedirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <SignedIn>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Bạn đã đăng nhập
          </h1>
          <p className="text-slate-600 mb-6">
            Chuyển hướng đến trang chủ...
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
          >
            Đi đến Dashboard
          </Link>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Chào mừng trở lại
              </h1>
              <p className="text-slate-600">
                Đăng nhập để truy cập các tính năng
              </p>
            </div>
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary: "bg-primary hover:bg-primary-hover",
                  card: "shadow-none border-0",
                },
              }}
              routing="path"
              path="/sign-in"
            />
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Chưa có tài khoản?{" "}
                <Link
                  href="/sign-up"
                  className="text-primary font-semibold hover:underline"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
```

### 2. Create Sign-Up Page

Create `app/sign-up/[[...sign-up]]/page.tsx`:
```typescript
import { SignUp, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <SignedIn>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Bạn đã đăng ký
          </h1>
          <p className="text-slate-600 mb-6">
            Chuyển hướng đến dashboard...
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
          >
            Đi đến Dashboard
          </Link>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Tạo tài khoản mới
              </h1>
              <p className="text-slate-600">
                Đăng ký để bắt đầu sử dụng
              </p>
            </div>
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: "bg-primary hover:bg-primary-hover",
                  card: "shadow-none border-0",
                },
              }}
              routing="path"
              path="/sign-up"
              redirectUrl="/dashboard"
            />
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Đã có tài khoản?{" "}
                <Link
                  href="/sign-in"
                  className="text-primary font-semibold hover:underline"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
```

## Todo List

- [ ] Create sign-in catch-all route
- [ ] Implement SignIn component
- [ ] Add signed-in redirect logic
- [ ] Create sign-up catch-all route
- [ ] Implement SignUp component
- [ ] Add link between sign-in/sign-up
- [ ] Style to match app design
- [ ] Test auth flow end-to-end

## Success Criteria

- Sign-in page renders correctly
- Sign-up page renders correctly
- Google OAuth button appears
- Email/password form works
- Redirect after successful auth
- Links between pages work
- Mobile responsive design
- Vietnamese text displayed

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Catch-all route conflicts | Low | Test thoroughly |
| OAuth redirect issues | Medium | Check callback URLs |
- **Redirect URLs**: Ensure environment variables set
- **Styling**: Match existing design system
- **Mobile**: Test on responsive breakpoints

## Next Steps

Proceed to [Phase 4: Update Header with Auth UI](./phase-04-update-header.md)

**Dependencies**: Phase 2 (Provider integrated)
**Blocks**: Phase 4 (needs auth pages for links)
