# Phase 6: Create Protected Pages

**Priority**: P1
**Status**: Pending
**Effort**: 2 hours

## Overview

Create protected dashboard and saved-designs pages that only authenticated users can access, using server-side auth helpers for secure data fetching.

## Context Links

- [currentUser() Helper](https://clerk.com/docs/references/backend/current-user)
- [Server-Side Auth](https://clerk.com/docs/references/backend/authorize)

## Key Insights

- **currentUser()** fetches user data in server components
- **auth()** provides auth context for server components
- **No client-side auth checks** needed (handled by middleware)
- **Server components** are more secure and performant
- **User metadata** available for personalization

## Requirements

### Functional
- Create /dashboard page with user info
- Create /saved-designs page for user's designs
- Display user name and email
- Show placeholder content for future features
- Responsive design

### Non-Functional
- Secure server-side data fetching
- Fast page loads
- TypeScript types
- Match app design system

## Architecture

```
Protected Routes (Server Components)
├── Dashboard
│   ├── User info (from currentUser())
│   ├── Quick actions
│   └── Stats/overview
└── Saved Designs
    ├── Design list
    └── Empty state
```

## Related Code Files

### Files to Create
- **app/dashboard/page.tsx** - User dashboard
- **app/saved-designs/page.tsx** - Saved designs

### Files to Reference
- **Protected routes** - Middleware protects these

## Implementation Steps

### 1. Create Dashboard Page

Create `app/dashboard/page.tsx`:
```typescript
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return null; // Middleware handles redirect
  }

  const userName = user.firstName || user.emailAddresses[0]?.emailAddress || "Người dùng";
  const userEmail = user.emailAddresses[0]?.emailAddress;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Xin chào, {userName}! 👋
          </h1>
          <p className="text-slate-600">
            Chào mừng đến với Dashboard của bạn
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-sm text-slate-600">Thiết kế đã lưu</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-sm text-slate-600">Dự án</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-sm text-slate-600">Nhà thầu đã lưu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Hành động nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/agents/ai-thiet-ke"
              className="bg-gradient-to-r from-primary to-primary-hover text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Thiết kế mới</h3>
                  <p className="text-white/80 text-sm">Tạo thiết kế với AI</p>
                </div>
              </div>
            </Link>

            <Link
              href="/nha-thau"
              className="bg-white border-2 border-slate-200 p-6 rounded-2xl hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Tìm nhà thầu</h3>
                  <p className="text-slate-600 text-sm">Tìm nhà thầu phù hợp</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Hoạt động gần đây</h2>
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-600 mb-4">Chưa có hoạt động nào</p>
            <p className="text-sm text-slate-500">Bắt đầu khám phá các tính năng của chúng tôi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 2. Create Saved Designs Page

Create `app/saved-designs/page.tsx`:
```typescript
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function SavedDesignsPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Thiết kế đã lưu
              </h1>
              <p className="text-slate-600">
                Quản lý và xem lại các thiết kế của bạn
              </p>
            </div>
            <Link
              href="/agents/ai-thiet-ke"
              className="hidden sm:inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tạo thiết kế mới
            </Link>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-2xl shadow-lg p-12 border border-slate-200 text-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Chưa có thiết kế nào
          </h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Bắt đầu tạo thiết kế nội thất với AI của chúng tôi
          </p>
          <Link
            href="/agents/ai-thiet-ke"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tạo thiết kế đầu tiên
          </Link>
        </div>
      </div>
    </div>
  );
}
```

## Todo List

- [ ] Create dashboard page with user info
- [ ] Display user name and email
- [ ] Add stats grid
- [ ] Add quick action cards
- [ ] Create saved designs page
- [ ] Add empty state design
- [ ] Style to match app design
- [ ] Test protected route access

## Success Criteria

- Dashboard displays user information
- Dashboard shows placeholder content
- Saved designs page displays empty state
- Both pages accessible only when authenticated
- Unauthenticated users redirected to sign-in
- Responsive design on mobile/desktop
- TypeScript types correct

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Server component auth fails | Medium | Handle null user gracefully |
- **Dashboard features**: Add more as user requests
- **Saved designs**: Will integrate with database later

## Next Steps

Proceed to [Phase 7: Add Error Handling](./phase-07-error-handling.md)

**Dependencies**: Phase 5 (Middleware protects routes)
**Blocks**: Phase 7 (Complete before testing)
