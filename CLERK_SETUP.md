# Clerk Setup Guide

This guide explains how to set up Clerk authentication for the Bản Đồ Xây Nhà AI application.

## Prerequisites

- Node.js installed
- Clerk account (sign up at https://dashboard.clerk.com)
- Google Cloud Console account (for Google OAuth)

## Installation

1. Install Clerk SDK:
```bash
npm install @clerk/nextjs --legacy-peer-deps
```

Note: We use `--legacy-peer-deps` due to React version compatibility.

## Clerk Dashboard Setup

### 1. Create Clerk Application

1. Go to https://dashboard.clerk.com
2. Sign up or login
3. Click "Add Application"
4. Choose "Next.js" as framework
5. Application name: "Bandoxaynha AI"
6. Click "Create"
7. Copy the **Publishable Key** and **Secret Key**

### 2. Configure Environment Variables

Add your Clerk keys to `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Replace `pk_test_xxxxx` and `sk_test_xxxxx` with your actual keys from the Clerk dashboard.

### 3. Configure Google OAuth

1. In Clerk Dashboard → application → Configure → "Social Connections"
2. Click "Add" next to "Google"
3. Create Google OAuth app in Google Cloud Console:
   - Go to https://console.cloud.google.com/apis/credentials
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Name: "Bandoxaynha AI"
   - Authorized redirect URIs:
     - `https://YOUR_DOMAIN.vault.clerk.account/v1/callback`
   - Click "Create"
   - Copy the **Client ID** and **Client Secret**
4. Paste Client ID and Client Secret into Clerk dashboard
5. Click "Save"

### 4. Configure Email/Password Authentication

1. In Clerk Dashboard → application → Configure → "User & Authentication"
2. Under "Contact information", enable "Email address"
3. Under "Password requirements", enable "Password" method
4. (Optional) Configure email templates in Vietnamese
5. Clerk provides free email delivery for development

### 5. Set Vietnamese Language

1. Clerk Dashboard → application → Customize → "Localization"
2. Select "Vietnamese" as default language
3. Customize email templates for Vietnamese context if needed

## Security Best Practices

- **Never commit** `.env.local` to version control (it's already in `.gitignore`)
- Use different keys for development and production
- Rotate keys if compromised
- Enable 2FA on your Clerk account
- Review OAuth scopes for minimal access
- Use environment variables for all sensitive data

## Testing the Setup

1. Start the development server:
```bash
npm run dev
```

2. Visit `http://localhost:3000/sign-in` to test the sign-in flow

3. Try signing in with:
   - Google OAuth
   - Email and password

## Troubleshooting

### "Invalid API keys" error
- Verify you copied the correct keys from the Clerk dashboard
- Check that keys are in `.env.local` and properly formatted
- Restart the development server after updating `.env.local`

### Google OAuth redirect error
- Verify the redirect URI in Google Cloud Console matches Clerk's callback URL
- Check that the OAuth app is published (not in testing mode for production)

### Installation peer dependency errors
- Use `--legacy-peer-deps` flag with npm install
- The peer dependency warnings are safe to ignore

## Next Steps

After completing this setup, proceed to:
- Phase 2: Integrate ClerkProvider
- Phase 3: Create Auth Pages
- Phase 4: Update Header with Auth UI

## Resources

- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
- [Google OAuth Setup Guide](https://clerk.com/docs/authentication/social-identity-providers/google)
- Clerk Dashboard: https://dashboard.clerk.com
