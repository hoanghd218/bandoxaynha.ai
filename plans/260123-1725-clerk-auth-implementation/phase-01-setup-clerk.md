# Phase 1: Setup Clerk SDK & Environment

**Priority**: P1
**Status**: Completed
**Effort**: 1 hour
**Completed**: 2026-01-23

## Overview

Install Clerk SDK, configure environment variables, and set up Clerk application dashboard for Next.js 16 app with Google OAuth and email/password authentication.

## Context Links

- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
- Clerk Dashboard: https://dashboard.clerk.com
- [Google OAuth Setup Guide](https://clerk.com/docs/authentication/social-identity-providers/google)

## Key Insights

- **@clerk/nextjs** provides official Next.js 16+ support with App Router
- **Environment variables** required: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- **Clerk Dashboard** provides UI for configuring OAuth providers and auth flows
- **Vietnamese language** support available in Clerk dashboard settings
- **Google OAuth** requires Google Cloud Console setup with callback URLs

## Requirements

### Functional
- Install @clerk/nextjs package
- Configure environment variables in .env.local
- Set up Clerk application with Google OAuth
- Configure email/password authentication
- Set up Vietnamese language for auth flows

### Non-Functional
- TypeScript types automatically included with @clerk/nextjs
- Zero runtime config needed after setup
- Secure secret key handling

## Architecture

```
Next.js App
├── @clerk/nextjs (SDK)
│   ├── ClerkProvider (React context)
│   ├── auth() (Server helper)
│   ├── currentUser() (Server helper)
│   └── useAuth() (Client hook)
└── Clerk Dashboard (Configuration)
    ├── OAuth providers
    ├── Email/password settings
    ├── JWT templates
    └── Localization (Vietnamese)
```

## Related Code Files

### Files to Modify
- **package.json** - Add @clerk/nextjs dependency

### Files to Create
- **.env.local** - Clerk keys (not committed)
- **.env.example** - Environment template
- **CLERK_SETUP.md** - Setup documentation

## Implementation Steps

### 1. Install Clerk SDK
```bash
npm install @clerk/nextjs
```

### 2. Create Clerk Application
1. Go to https://dashboard.clerk.com
2. Sign up/login to Clerk
3. Click "Add Application"
4. Choose "Next.js" as framework
5. Application name: "Bandoxaynha AI"
6. Copy **Publishable Key** and **Secret Key**

### 3. Configure Google OAuth in Clerk
1. In Clerk Dashboard → application → Configure → "Social Connections"
2. Add "Google" provider
3. Create Google OAuth app in Google Cloud Console:
   - Go to https://console.cloud.google.com/apis/credentials
   - Create new OAuth 2.0 Client ID
   - Authorized redirect URIs: `https://YOUR_DOMAIN.vault.clerk.account/v1/callback`
   - Get Client ID and Client Secret
4. Paste Client ID and Client Secret into Clerk dashboard

### 4. Configure Email/Password
1. In Clerk Dashboard → application → Configure → "User & Authentication"
2. Enable "Email code" and/or "Password" methods
3. Configure email templates in Vietnamese
4. Set up email domain (Clerk provides free email service for dev)

### 5. Set Environment Variables
Create `.env.local` (add to .gitignore):
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Create `.env.example`:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### 6. Configure Vietnamese Language
1. Clerk Dashboard → application → Customize → "Localization"
2. Select "Vietnamese" as default language
3. Customize email templates for Vietnamese context

### 7. Update .gitignore
Ensure .env.local is ignored (should already be):
```gitignore
.env.local
.env*.local
```

## Todo List

- [x] Install @clerk/nextjs package
- [ ] Create Clerk application in dashboard (User action required)
- [ ] Configure Google OAuth provider (User action required)
- [ ] Enable email/password authentication (User action required)
- [x] Create .env.local with Clerk keys (placeholder keys, user to replace)
- [x] Create .env.example template
- [ ] Set Vietnamese language in Clerk dashboard (User action required)
- [x] Verify .gitignore includes .env.local

## Success Criteria

- @clerk/nextjs installed and in package.json
- Clerk application created and configured
- Google OAuth provider configured
- Email/password authentication enabled
- .env.local created with valid keys
- .env.example created for team reference
- Vietnamese language set in Clerk dashboard

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Wrong keys in .env.local | High | Double-check copy from dashboard |
| Google OAuth misconfigured | Medium | Follow Clerk docs step-by-step |
| Email delivery issues | Low | Use Clerk's free dev email |
| Keys committed to git | High | Verify .gitignore, use env.example |

## Security Considerations

- **Never commit** CLERK_SECRET_KEY to version control
- Use different keys for development vs production
- Rotate keys if compromised
- Enable 2FA on Clerk account
- Review OAuth scopes for minimal access

## Next Steps

Proceed to [Phase 2: Integrate ClerkProvider](./phase-02-integrate-provider.md)

**Dependencies**: None
**Blocks**: Phase 2 (requires SDK installation)
