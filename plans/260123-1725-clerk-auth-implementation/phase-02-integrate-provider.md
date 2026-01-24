# Phase 2: Integrate ClerkProvider

**Priority**: P1
**Status**: Pending
**Effort**: 0.5 hours

## Overview

Wrap the Next.js application with ClerkProvider to enable authentication context throughout the app. This enables all Clerk hooks and server-side helpers.

## Context Links

- [ClerkProvider Documentation](https://clerk.com/docs/components/clerk-provider)
- Current layout: `/app/layout.tsx`

## Key Insights

- **ClerkProvider** must wrap entire app at root
- **Must be client component** (use "use client" directive)
- **Server-side auth** via auth() helper in server components
- **Client-side auth** via useAuth() hook in client components
- **App Router** requires provider in layout.tsx

## Requirements

### Functional
- Wrap app with ClerkProvider
- Configure publishable key from environment
- Maintain existing font configurations
- Preserve existing metadata and layout structure

### Non-Functional
- No performance impact
- Type-safe integration
- Preserve existing styling and structure

## Architecture

```
Root Layout (Server Component)
└── ClerkProvider (Client Component)
    └── Body (HTML)
        └── Fonts
        └── Children (All pages)
```

## Related Code Files

### Files to Modify
- **app/layout.tsx** - Add ClerkProvider wrapper

### Files to Reference
- **Current layout** - Preserve fonts, metadata, structure
- **.env.local** - Get publishable key

## Implementation Steps

### 1. Extract Client Provider Component

Create `components/ClerkProviderWrapper.tsx`:
```typescript
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { ReactNode } from "react";

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

export default function ClerkProviderWrapper({
  children,
}: ClerkProviderWrapperProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary: "bg-primary hover:bg-primary-hover",
          card: "shadow-xl",
        },
      }}
      localization={{
        signIn: {
          start: {
            title: "Đăng nhập",
            subtitle: "Chào mừng trở lại",
          },
        },
        signUp: {
          start: {
            title: "Đăng ký",
            subtitle: "Tạo tài khoản mới",
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
```

### 2. Update Root Layout

Modify `app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import ClerkProviderWrapper from "@/components/ClerkProviderWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bản Đồ Xây Nhà AI - Trợ lý ảo xây dựng nhà thông minh",
  description: "Nền tảng AI hỗ trợ xây dựng nhà thông minh với thiết kế nội thất, tìm kiếm nhà thầu và nhiều công cụ hữu ích khác.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased bg-slate-50 text-slate-800`}
      >
        <ClerkProviderWrapper>{children}</ClerkProviderWrapper>
      </body>
    </html>
  );
}
```

## Todo List

- [ ] Create ClerkProviderWrapper component
- [ ] Configure ClerkProvider with theme
- [ ] Add Vietnamese localization strings
- [ ] Update root layout to use wrapper
- [ ] Verify app runs without errors
- [ ] Check fonts still render correctly

## Success Criteria

- ClerkProviderWrapper component created
- Root layout wraps children with ClerkProvider
- App builds and runs successfully
- No TypeScript errors
- Existing fonts still work
- Preserved all existing functionality

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing env vars breaks build | Medium | Add validation, show error |
| Font loading issues | Low | Test thoroughly |
- **Theme configuration**: Match app design system
- **Localization**: Complete Vietnamese translations

## Next Steps

Proceed to [Phase 3: Create Auth Pages](./phase-03-create-auth-pages.md)

**Dependencies**: Phase 1 (SDK installed)
**Blocks**: Phase 3 (needs provider for auth pages)
