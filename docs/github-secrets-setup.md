# GitHub Secrets Setup Guide

This guide explains how to configure GitHub repository secrets for the Skill-Wanderer blog Firebase integration.

## 🔐 Required Secrets

The following secrets must be configured in your GitHub repository for proper CI/CD functionality:

### Firebase Configuration Secrets

| Secret Name | Value | Purpose |
|-------------|-------|---------|
| `PUBLIC_FIREBASE_API_KEY` | `AIzaSyCr_1Fo6hzJDsKZrjw2u3HlrFhBnfeHmxE` | Firebase API authentication |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | `skill-wanderer-hub.firebaseapp.com` | Firebase authentication domain |
| `PUBLIC_FIREBASE_PROJECT_ID` | `skill-wanderer-hub` | Firebase project identifier |
| `PUBLIC_FIREBASE_STORAGE_BUCKET` | `skill-wanderer-hub.appspot.com` | Firebase storage bucket |
| `PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `801841516442` | Firebase Cloud Messaging sender ID |
| `PUBLIC_FIREBASE_APP_ID` | `1:801841516442:web:77c33043420a581b95f423` | Firebase application identifier |
| `PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-XZETSK476Y` | Firebase Analytics measurement ID |

## 📝 Step-by-Step Setup

### 1. Access Repository Settings

1. Navigate to your GitHub repository
2. Click on the **Settings** tab
3. In the left sidebar, click **Secrets and variables**
4. Select **Actions**

### 2. Add Each Secret

For each secret in the table above:

1. Click **New repository secret**
2. Enter the **Name** exactly as shown (case-sensitive)
3. Paste the corresponding **Value**
4. Click **Add secret**

### 3. Verify Configuration

After adding all secrets, you should see 7 secrets listed:
- ✅ PUBLIC_FIREBASE_API_KEY
- ✅ PUBLIC_FIREBASE_AUTH_DOMAIN
- ✅ PUBLIC_FIREBASE_PROJECT_ID
- ✅ PUBLIC_FIREBASE_STORAGE_BUCKET
- ✅ PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- ✅ PUBLIC_FIREBASE_APP_ID
- ✅ PUBLIC_FIREBASE_MEASUREMENT_ID

## 🔄 How Secrets Are Used

### In GitHub Actions Workflows

**CI Workflow** (`ci.yml`):
- Sets environment variables during the build process
- Passes secrets as Docker build arguments for testing

**Build and Push Workflow** (`build-and-push.yml`):
- Injects Firebase configuration into Docker images as build arguments
- Ensures production builds have proper Firebase integration

### In Docker Builds

The `Dockerfile` has been modified to:
- Accept Firebase configuration as build arguments
- Set them as environment variables during the build process
- Embed them into the static site for runtime use

## ⚠️ Security Considerations

### Why These Values Are Safe as Secrets

- These are **client-side Firebase configuration values**
- They are designed to be included in public client applications
- They are **not server-side API keys** or sensitive credentials
- Firebase security is handled through Firebase Security Rules, not through hiding these values

### Benefits of Using GitHub Secrets

- **Consistency**: Ensures the same configuration across all environments
- **Centralized Management**: Easy to update values in one place
- **Audit Trail**: GitHub tracks who changes secrets and when
- **Environment Separation**: Can use different values for different branches if needed

## 🛠️ Troubleshooting

### Build Failures

If GitHub Actions builds fail with Firebase-related errors:

1. **Verify Secret Names**: Ensure secret names match exactly (case-sensitive)
2. **Check Secret Values**: Confirm all values are copied correctly without extra spaces
3. **Review Workflow Files**: Ensure the workflow files reference the correct secret names

### Local Development

For local development, these values should be in your `.env` file:

```bash
PUBLIC_FIREBASE_API_KEY="AIzaSyCr_1Fo6hzJDsKZrjw2u3HlrFhBnfeHmxE"
PUBLIC_FIREBASE_AUTH_DOMAIN="skill-wanderer-hub.firebaseapp.com"
PUBLIC_FIREBASE_PROJECT_ID="skill-wanderer-hub"
PUBLIC_FIREBASE_STORAGE_BUCKET="skill-wanderer-hub.appspot.com"
PUBLIC_FIREBASE_MESSAGING_SENDER_ID="801841516442"
PUBLIC_FIREBASE_APP_ID="1:801841516442:web:77c33043420a581b95f423"
PUBLIC_FIREBASE_MEASUREMENT_ID="G-XZETSK476Y"
```

## 📞 Support

If you encounter issues with the secrets configuration:

1. Check the GitHub Actions logs for specific error messages
2. Verify all secrets are properly configured
3. Ensure the Firebase project is active and accessible
4. Review the Firebase configuration in `src/lib/firebase.ts`

---

*This configuration enables the email subscription functionality and proper CI/CD builds for the Skill-Wanderer blog.*
