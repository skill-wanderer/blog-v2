# Production Environment Setup Guide

This guide explains how to configure environment variables for production deployment of your Astro blog.

## Environment Variables Structure

### Development (`.env.local`)
- Contains actual Firebase configuration values
- Not committed to version control
- Used for local development

### Production (`.env.production`)
- Maps production environment variables to Astro's PUBLIC_ prefixed variables
- Can be committed to version control (contains no secrets)
- Used during production builds

## Required Environment Variables

For production deployment, you need to set these environment variables in your hosting platform:

```bash
FIREBASE_API_KEY=your-actual-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
```

## Platform-Specific Setup

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Set environment variables:
   ```bash
   vercel env add FIREBASE_API_KEY
   vercel env add FIREBASE_AUTH_DOMAIN
   vercel env add FIREBASE_PROJECT_ID
   vercel env add FIREBASE_STORAGE_BUCKET
   vercel env add FIREBASE_MESSAGING_SENDER_ID
   vercel env add FIREBASE_APP_ID
   ```
3. Deploy: `vercel --prod`

### Netlify

1. Go to your site dashboard
2. Navigate to Site Settings > Environment Variables
3. Add each `FIREBASE_*` variable with its value
4. Deploy your site

### Docker

If using Docker for production:

1. Create a production environment file (not committed):
   ```bash
   # .env.prod (local file, not committed)
   FIREBASE_API_KEY=your-actual-api-key
   FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   # ... etc
   ```

2. Update your docker-compose.yml:
   ```yaml
   services:
     blog:
       build: .
       env_file:
         - .env.prod
   ```

### Kubernetes

Set environment variables in your deployment manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: blog-deployment
spec:
  template:
    spec:
      containers:
      - name: blog
        image: your-blog-image
        env:
        - name: FIREBASE_API_KEY
          valueFrom:
            secretKeyRef:
              name: firebase-secrets
              key: api-key
        # ... repeat for other variables
```

## Validation

Before deploying, run the environment checker:

```bash
npm run env:check
```

This will validate your local configuration and provide deployment guidance.

## Build Commands

- **Development**: `npm run dev`
- **Production Build**: `npm run build:production`
- **Preview Production**: `npm run preview:production`

## Security Notes

1. **Never commit `.env.local`** - it contains sensitive data
2. **Production variables** should be set in your hosting platform's environment
3. **The `.env.production` file** can be committed as it only contains variable mappings
4. **Use different Firebase projects** for development and production
5. **Regularly rotate your API keys** and update them in your hosting platform

## Troubleshooting

### Common Issues

1. **"Missing environment variables" error**:
   - Check that all `FIREBASE_*` variables are set in your hosting platform
   - Verify variable names match exactly (case-sensitive)

2. **Firebase initialization fails**:
   - Ensure your Firebase project is active
   - Check that the project ID matches your actual Firebase project

3. **Variables not updating**:
   - Clear your build cache
   - Redeploy your application
   - Check hosting platform environment variable settings

### Getting Help

1. Run `npm run env:check` to validate your configuration
2. Check the browser console for Firebase errors
3. Verify your Firebase project settings in the console
