# Firebase Integration for Skill-Wanderer Blog

This document explains how Firebase is integrated into the blog project with Kubernetes configuration injection.

## Overview

The project integrates Firebase for:
- **Analytics**: Track user engagement, page views, reading progress, and social sharing
- **Future Features**: Ready for authentication, comments system, and newsletter subscriptions
- **Performance Monitoring**: Track Core Web Vitals and user experience metrics

## Configuration

### Development Setup

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Analytics (optional)
   - Add a web app to get configuration

2. **Environment Variables**:
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Edit .env.local with your Firebase configuration
   ```

3. **Required Variables**:
   ```env
   PUBLIC_FIREBASE_API_KEY=your-api-key
   PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   PUBLIC_FIREBASE_APP_ID=your-app-id
   PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id  # Optional
   ```

   **Important**: The `PUBLIC_` prefix is required for Astro to make these variables available on the client-side where Firebase needs them.

### Production Setup (Kubernetes)

1. **Create Firebase Secret**:
   ```bash
   # Edit the secret with your Firebase configuration
   kubectl apply -f k8s/firebase-secret.yaml
   ```

2. **Update Secret Values**:
   ```bash
   kubectl edit secret firebase-config
   ```

3. **Deploy Application**:
   ```bash
   kubectl apply -k k8s/
   ```

## File Structure

```
src/
├── lib/
│   ├── firebase.ts              # Firebase configuration and initialization
│   ├── analytics.ts             # Blog analytics utilities
│   └── firebase-services.ts     # Firestore, Auth, Storage services
├── components/
│   └── FirebaseInit.astro       # Firebase initialization component
├── scripts/
│   └── firebase-init.ts         # Client-side Firebase initialization
└── layouts/
    ├── BaseLayout.astro         # Includes Firebase initialization
    └── BlogLayout.astro         # Includes analytics meta tags

k8s/
├── firebase-secret.yaml         # Firebase configuration secret
├── deployment.yaml              # Updated with environment variables
└── kustomization.yaml           # Updated to include Firebase secret
```

## Features

### Analytics Tracking

The analytics system automatically tracks:

- **Page Views**: All page visits with metadata
- **Reading Progress**: 75% and 100% scroll depth
- **Time on Page**: 30s, 60s, and 5min milestones
- **External Link Clicks**: Outbound link tracking
- **Social Sharing**: Share button interactions
- **Search Queries**: Site search tracking

### Event Types

```typescript
// Page view tracking
trackBlogPageView(title, slug, category, authorId, readTime, tags);

// Reading progress
trackReadingProgress(postId, title, authorId, category, 'scroll_75');

// Custom events
blogAnalytics.trackCustomEvent('newsletter_signup', { source: 'blog' });
```

### Available Services

1. **Analytics** (`analytics.ts`):
   - Blog-specific event tracking
   - User engagement metrics
   - Reading behavior analysis

2. **Firestore** (`firebase-services.ts`):
   - Comments system (ready for implementation)
   - Newsletter subscriptions
   - Analytics data storage

3. **Authentication** (`firebase-services.ts`):
   - User sign-in/sign-up
   - Authentication state management

4. **Storage** (`firebase-services.ts`):
   - File upload/download
   - Image optimization

## Security

- Firebase configuration is injected via Kubernetes secrets
- API keys are restricted by domain in Firebase console
- Authentication rules should be configured in Firebase console
- Firestore security rules should be set up for data protection

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PUBLIC_FIREBASE_API_KEY` | Firebase Web API Key | Yes |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Yes |
| `PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | Yes |
| `PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Yes |
| `PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | FCM Sender ID | Yes |
| `PUBLIC_FIREBASE_APP_ID` | Firebase App ID | Yes |
| `PUBLIC_FIREBASE_MEASUREMENT_ID` | Google Analytics Measurement ID | No |

## Deployment

### Kubernetes Deployment

1. **Update Firebase Secret**:
   ```bash
   # Edit with your actual Firebase configuration
   kubectl edit secret firebase-config
   ```

2. **Apply Kubernetes Configuration**:
   ```bash
   kubectl apply -k k8s/
   ```

3. **Verify Deployment**:
   ```bash
   kubectl get pods
   kubectl logs -f deployment/blog-v2
   ```

### Environment Verification

The application will log Firebase initialization status:
- ✅ "Firebase initialized successfully" - Configuration is valid
- ⚠️ "Firebase is not configured" - Missing or invalid configuration

## Troubleshooting

### Common Issues

1. **Firebase not initializing**:
   - Check environment variables are set correctly
   - Verify Firebase project configuration
   - Check browser console for errors

2. **Analytics not tracking**:
   - Ensure `FIREBASE_MEASUREMENT_ID` is set
   - Check Firebase Analytics is enabled
   - Verify domain is allowed in Firebase console

3. **Kubernetes secret issues**:
   - Verify secret exists: `kubectl get secret firebase-config`
   - Check secret data: `kubectl describe secret firebase-config`
   - Ensure pod has access to secret

### Debug Commands

```bash
# Check Firebase configuration in development
console.log(getFirebaseConfig());

# Verify environment variables in pod
kubectl exec -it deployment/blog-v2 -- env | grep FIREBASE

# Check Firebase service status
kubectl logs deployment/blog-v2 | grep -i firebase
```

## Future Enhancements

The Firebase integration is designed to support:

1. **Comments System**: Real-time comments with moderation
2. **Newsletter Subscriptions**: Email list management
3. **User Authentication**: User accounts and personalization
4. **Performance Monitoring**: Core Web Vitals tracking
5. **A/B Testing**: Firebase Remote Config integration
6. **Push Notifications**: Firebase Cloud Messaging

## Contributing

When adding new Firebase features:

1. Update service classes in `firebase-services.ts`
2. Add corresponding analytics events in `analytics.ts`
3. Update this README with new environment variables
4. Test in both development and production environments
