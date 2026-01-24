# Phase 8: Test Authentication Flow

**Priority**: P1
**Status**: Pending
**Effort**: 1 hour

## Overview

Comprehensive testing of all authentication flows including sign-up, sign-in, OAuth, protected routes, and error scenarios.

## Context Links

- [Clerk Testing Guide](https://clerk.com/docs/testing)
- Test cases below

## Key Insights

- **Test all auth methods**: Google OAuth + Email/Password
- **Test all protected routes**: Dashboard, saved designs
- **Test error scenarios**: Invalid credentials, network errors
- **Test responsive design**: Mobile, tablet, desktop
- **Test redirects**: Unauthenticated users redirected correctly

## Requirements

### Functional
- Sign up with email/password
- Sign in with email/password
- Sign in with Google OAuth
- Sign out works correctly
- Protected routes enforce auth
- Public routes accessible
- Error handling displays correctly
- User profile shows in header

### Non-Functional
- Fast page loads
- Mobile responsive
- No console errors
- TypeScript types valid

## Test Cases

### 1. Sign-Up Flow

**Email/Password Sign-Up:**
1. Navigate to `/sign-up`
2. Enter valid email and password
3. Submit form
4. Verify email if required
5. Verify redirect to `/dashboard`
6. Verify user profile in header

**Email/Password Validation:**
- Invalid email format shows error
- Weak password shows error
- Duplicate email shows error
- Required fields validated

**Google OAuth Sign-Up:**
1. Navigate to `/sign-up`
2. Click "Continue with Google"
3. Complete Google OAuth flow
4. Verify redirect to `/dashboard`
5. Verify user profile in header

### 2. Sign-In Flow

**Email/Password Sign-In:**
1. Navigate to `/sign-in`
2. Enter registered email and password
3. Submit form
4. Verify redirect to `/dashboard`
5. Verify user profile in header

**Invalid Credentials:**
- Wrong email shows error
- Wrong password shows error
- Non-existent account shows error

**Google OAuth Sign-In:**
1. Navigate to `/sign-in`
2. Click "Continue with Google"
3. Complete Google OAuth flow
4. Verify redirect to `/dashboard`

**Remember Me:**
- Sign in with "remember me" checked
- Close and reopen browser
- Verify still logged in

### 3. Sign-Out Flow

1. Click user avatar in header
2. Click "Sign out"
3. Verify redirect to `/`
4. Verify "Đăng nhập" button in header
5. Try accessing `/dashboard` → redirect to `/sign-in`

### 4. Protected Routes

**Dashboard Access:**
- Authenticated user can access `/dashboard`
- Unauthenticated user redirected to `/sign-in`
- After sign-in, redirect back to `/dashboard`

**Saved Designs Access:**
- Authenticated user can access `/saved-designs`
- Unauthenticated user redirected to `/sign-in`

### 5. Public Routes

**Homepage:**
- Accessible without auth
- Shows "Đăng nhập" button when not logged in
- Shows user profile when logged in

**Agents Pages:**
- Accessible without auth
- Features work correctly

**Nha Thau Page:**
- Accessible without auth
- Features work correctly

### 6. User Profile

**User Button:**
- Avatar displays correctly
- Menu opens on click
- Shows user name/email
- "Profile" option works
- "Sign out" option works

**User Data:**
- Dashboard shows user name
- Correct email displayed
- User metadata accessible

### 7. Error Handling

**Network Errors:**
- Disconnect internet during sign-in
- Verify error message displays
- Reconnect and retry works

**Rate Limiting:**
- Multiple failed login attempts
- Verify rate limit message

**Session Expired:**
- Wait for session to expire
- Verify sign-out occurs
- Verify sign-in prompt on next action

### 8. Responsive Design

**Mobile (< 768px):**
- Header layout works
- Auth buttons accessible
- Sign-in/sign-up pages responsive
- Dashboard cards stack correctly

**Tablet (768px - 1024px):**
- Header layout works
- Navigation displays correctly
- Dashboard grid adapts

**Desktop (> 1024px):**
- Full header layout
- Navigation visible
- Dashboard 3-column grid

## Testing Checklist

### Setup
- [ ] Environment variables loaded correctly
- [ ] Clerk app configured properly
- [ ] Google OAuth working
- [ ] App builds without errors
- [ ] No TypeScript errors

### Sign-Up Tests
- [ ] Email/password sign-up works
- [ ] Email validation works
- [ ] Password validation works
- [ ] Duplicate email error shows
- [ ] Google OAuth sign-up works
- [ ] Redirect to dashboard after sign-up
- [ ] User profile appears in header

### Sign-In Tests
- [ ] Email/password sign-in works
- [ ] Wrong email shows error
- [ ] Wrong password shows error
- [ ] Google OAuth sign-in works
- [ ] "Remember me" works
- [ ] Redirect to dashboard after sign-in

### Sign-Out Tests
- [ ] Sign-out from user menu works
- [ ] Redirect to home after sign-out
- [ ] "Đăng nhập" button appears
- [ ] Protected routes blocked after sign-out

### Protected Routes Tests
- [ ] /dashboard requires auth
- [ ] /saved-designs requires auth
- [ ] Redirect to sign-in works
- [ ] Redirect back after sign-in works

### Public Routes Tests
- [ ] Homepage accessible without auth
- [ ] /agents accessible without auth
- [ ] /nha-thau accessible without auth
- [ ] /sign-in accessible without auth
- [ ] /sign-up accessible without auth

### Error Handling Tests
- [ ] Network errors handled
- [ ] Rate limiting message shows
- [ ] Session expiry handled
- [ ] Invalid credentials show error
- [ ] Error boundary catches errors

### UI/UX Tests
- [ ] Loading states work
- [ ] No layout shift on auth load
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Vietnamese text displays correctly
- [ ] No console errors

## Success Criteria

All test cases pass:
- ✅ Sign-up flow works
- ✅ Sign-in flow works
- ✅ Sign-out flow works
- ✅ Protected routes enforce auth
- ✅ Public routes accessible
- ✅ Error handling displays correctly
- ✅ Mobile responsive
- ✅ No console errors

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| OAuth callback issues | Medium | Verify callback URLs in Clerk |
| Session persistence issues | Low | Test with multiple browsers |
- **Browser testing**: Test Chrome, Firefox, Safari, Edge
- **Device testing**: Test mobile, tablet, desktop

## Next Steps

Proceed to [Phase 9: Documentation](./phase-09-documentation.md)

**Dependencies**: All previous phases complete
**Blocks**: Phase 9 (Test before documenting)
