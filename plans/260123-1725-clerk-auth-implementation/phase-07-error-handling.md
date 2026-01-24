# Phase 7: Add Error Handling

**Priority**: P2
**Status**: Pending
**Effort**: 0.5 hours

## Overview

Implement comprehensive error handling for authentication failures, network errors, and edge cases throughout the auth flow.

## Context Links

- [Clerk Error Handling](https://clerk.com/docs/errors)
- [Next.js Error Boundaries](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

## Key Insights

- **Clerk components** have built-in error handling
- **UserButton** shows errors in menu
- **try/catch** for custom auth operations
- **Error pages** for 404 and 500
- **Loading states** prevent jarring experiences

## Requirements

### Functional
- Handle sign-in errors (invalid credentials, rate limiting)
- Handle OAuth errors (denied access, network issues)
- Handle network errors gracefully
- Show user-friendly error messages in Vietnamese
- Add error boundaries for auth components

### Non-Functional
- Fast error recovery
- Clear error messages
- No broken auth state

## Architecture

```
Error Handling Layers
├── Clerk Components (built-in errors)
├── Custom Components (try/catch)
└── Global Error Pages (404, 500)
```

## Related Code Files

### Files to Modify
- **app/sign-in/[[...sign-in]]/page.tsx** - Add error UI
- **app/sign-up/[[...sign-up]]/page.tsx** - Add error UI
- **app/dashboard/page.tsx** - Add error handling
- **app/saved-designs/page.tsx** - Add error handling

### Files to Create (Optional)
- **app/error.tsx** - Global error boundary
- **app/not-found.tsx** - Custom 404 page

## Implementation Steps

### 1. Update Sign-In Page with Error Handling

Enhance sign-in page with error display:
```typescript
// Add to app/sign-in/[[...sign-in]]/page.tsx
// Add error display above SignIn component
<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl hidden" id="error-container">
  <div className="flex items-center gap-3">
    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p className="text-red-700 text-sm">Có lỗi xảy ra khi đăng nhập</p>
  </div>
</div>

// Configure SignIn component with custom error messages
<SignIn
  appearance={{
    elements: {
      formButtonPrimary: "bg-primary hover:bg-primary-hover",
      card: "shadow-none border-0",
      formFieldErrorText: "text-red-600 text-sm",
      formFieldInput: "border-red-500 focus:border-red-500",
    },
  }}
  routing="path"
  path="/sign-in"
/>
```

### 2. Update Sign-Up Page with Error Handling

Similar to sign-in page.

### 3. Add Global Error Boundary

Create `app/error.tsx`:
```typescript
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Có lỗi xảy ra
        </h2>
        <p className="text-slate-600 mb-6">
          Chúng tôi xin lỗi vì sự bất tiện này
        </p>
        <Button onClick={reset} className="w-full">
          Thử lại
        </Button>
        <Link
          href="/"
          className="block mt-4 text-primary hover:underline"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
```

### 4. Add Loading States

Add loading components for auth operations:
```typescript
// In components/Header.tsx, add loading state
if (!isLoaded) {
  return (
    <header className="fixed top-4 left-4 right-4 md:left-6 md:right-6 lg:left-8 lg:right-8 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-2xl shadow-xl shadow-primary/5 px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-9 w-9 rounded-xl bg-slate-200 animate-pulse" />
              <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="h-9 w-20 bg-slate-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}
```

### 5. Add Network Error Handling

Wrap auth operations with try/catch:
```typescript
// In protected pages or auth functions
try {
  const user = await currentUser();
  // Process user data
} catch (error) {
  console.error("Auth error:", error);
  // Handle error gracefully
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600">Không thể tải thông tin người dùng</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-xl"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
```

## Error Messages (Vietnamese)

| Error Type | Message |
|------------|---------|
| Invalid credentials | Email hoặc mật khẩu không đúng |
| Rate limited | Quá nhiều lần thử, vui lòng thử lại sau |
| OAuth denied | Quyền truy cập bị từ chối |
| Network error | Lỗi kết nối mạng, vui lòng kiểm tra internet |
| Session expired | Phiên đăng nhập hết hạn, vui lòng đăng nhập lại |
| Email not verified | Vui lòng xác nhận email trước khi tiếp tục |

## Todo List

- [ ] Update sign-in page error handling
- [ ] Update sign-up page error handling
- [ ] Create global error boundary
- [ ] Add loading states to Header
- [ ] Add try/catch to protected pages
- [ ] Test error scenarios
- [ ] Verify Vietnamese error messages
- [ ] Test network failures

## Success Criteria

- All auth errors display user-friendly messages
- Network errors handled gracefully
- Loading states prevent layout shift
- Error boundary catches component errors
- Vietnamese error messages clear
- No broken auth states
- Recovery mechanisms work

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
- **Error monitoring**: Add logging in production
- **User feedback**: Allow users to report issues

## Next Steps

Proceed to [Phase 8: Test Authentication Flow](./phase-08-testing.md)

**Dependencies**: Phase 6 (Protected pages created)
**Blocks**: Phase 8 (Errors must be handled before testing)
