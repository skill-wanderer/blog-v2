# Environment Variables Setup

This document explains how to configure environment variables for both development and production environments.

## Quick Start

1. **For Development**: Copy `.env.example` to `.env.local` and fill in your Firebase configuration
2. **For Production**: Set the `FIREBASE_*` environment variables in your hosting platform
3. **Validation**: Run `npm run env:check` to verify your setup

## Files Overview

- **`.env.example`** - Template with example values and documentation
- **`.env.local`** - Development environment (not committed, create from example)
- **`.env.production`** - Production variable mappings (committed, no secrets)

## Environment Variables

### Development (`.env.local`)
```bash
PUBLIC_FIREBASE_API_KEY=your-actual-api-key
PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=your-project-id
PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Production (Environment Variables)
```bash
FIREBASE_API_KEY=your-actual-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
```

## Setup Commands

### Check Configuration
```bash
npm run env:check
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build:production
```

### Platform Setup (Windows)
```powershell
# Check current environment
.\setup-environment.ps1 -Check

# Setup for Vercel
.\setup-environment.ps1 -Platform vercel

# Setup for Netlify  
.\setup-environment.ps1 -Platform netlify

# Get help
.\setup-environment.ps1 -Help
```

## Deployment Platforms

### Vercel
```bash
vercel env add FIREBASE_API_KEY
vercel env add FIREBASE_AUTH_DOMAIN
vercel env add FIREBASE_PROJECT_ID
vercel env add FIREBASE_STORAGE_BUCKET
vercel env add FIREBASE_MESSAGING_SENDER_ID
vercel env add FIREBASE_APP_ID
vercel --prod
```

### Netlify
1. Go to Site Settings > Environment Variables
2. Add each `FIREBASE_*` variable
3. Deploy your site

### Docker
```dockerfile
# Set environment variables in docker-compose.yml
environment:
  - FIREBASE_API_KEY=${FIREBASE_API_KEY}
  - FIREBASE_AUTH_DOMAIN=${FIREBASE_AUTH_DOMAIN}
  # ... etc
```

## Security Best Practices

✅ **DO:**
- Use different Firebase projects for development and production
- Set production variables in your hosting platform's environment
- Regularly rotate API keys
- Keep `.env.local` out of version control

❌ **DON'T:**
- Commit `.env.local` to version control
- Hardcode secrets in your code
- Use production credentials in development
- Share environment files

## Troubleshooting

### Common Issues

1. **Missing variables error**: Run `npm run env:check` to identify missing variables
2. **Firebase init fails**: Verify your Firebase project is active and credentials are correct
3. **Build fails**: Ensure all required environment variables are set in your hosting platform

### Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings (gear icon)
4. Scroll to "Your apps" section
5. Click on your web app or create one
6. Copy the configuration values

## Additional Resources

- [Astro Environment Variables Guide](https://docs.astro.build/en/guides/environment-variables/)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
- [Production Setup Guide](./docs/PRODUCTION-SETUP.md)
