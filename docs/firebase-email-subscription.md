# Firebase Email Subscription Setup

This document provides setup instructions for the Firebase email subscription component that has been added to the blog.

## Component Features

The email subscription component (`EmailSubscription.astro`) includes:

- ✅ **Responsive Design**: Beautiful dark-themed form that works on all screen sizes
- ✅ **Firebase Integration**: Stores email subscriptions in Firestore
- ✅ **Environment Variables**: Uses Firebase config from `.env` file
- ✅ **Input Validation**: Client-side email validation
- ✅ **Loading States**: Visual feedback during submission
- ✅ **Success/Error Messages**: User-friendly feedback
- ✅ **Privacy Focused**: Email-only collection, transparent about data usage
- ✅ **Design Consistency**: Matches the project's dark theme and color scheme

## Firebase Setup Required

### 1. Firestore Database Setup

You need to create a collection called `email-subscribers` in your Firestore database.

### 2. Security Rules

Add these security rules to your Firestore to allow public writes to the email-subscribers collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read/write access to email-subscribers collection
    match /email-subscribers/{document} {
      allow create: if request.auth == null 
        && request.resource.data.keys().hasAll(['email', 'subscribedAt', 'isActive', 'source'])
        && request.resource.data.email is string
        && request.resource.data.email.matches('.*@.*\\..*')
        && request.resource.data.subscribedAt is timestamp
        && request.resource.data.isActive == true
        && request.resource.data.source == 'blog-subscription-form';
      
      // Only authenticated users can read subscriber data
      allow read: if request.auth != null;
    }
    
    // Add other rules for your existing collections here
  }
}
```

### 3. Environment Variables

Make sure your `.env` file contains all the Firebase configuration variables:

```properties
PUBLIC_FIREBASE_API_KEY="your-api-key"
PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
PUBLIC_FIREBASE_APP_ID="your-app-id"
PUBLIC_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

## Data Structure

Each email subscription is stored with the following fields:

```typescript
{
  email: string;           // Required: subscriber's email
  subscribedAt: Timestamp; // When they subscribed
  isActive: boolean;       // Always true on creation
  source: string;          // Always "blog-subscription-form"
  userAgent: string;       // Browser information
  ipAddress: null;         // Not captured for privacy
}
```

## Styling

The component uses the existing Tailwind CSS custom colors defined in `tailwind.config.mjs`:

- `skill-wanderer-primary-orange`: Main brand color
- `skill-wanderer-orange-hover`: Hover state color
- Other semantic colors from the existing color palette

## Component Location

The `EmailSubscription` component is automatically included in every page via the `BaseLayout.astro`:

- **Position**: Between the main content and footer
- **Pages**: All pages (home, blog posts, etc.)
- **Responsive**: Works on all screen sizes

## Testing

To test the component:

1. Run the development server: `npm run dev`
2. Visit any page on the site
3. Scroll down to see the email subscription form
4. Try submitting with different inputs:
   - Valid email: Should show success message
   - Invalid email: Should show validation error
   - Network error: Should show error message

## Future Enhancements

Consider adding:

- Email confirmation/verification
- Double opt-in process
- Unsubscribe functionality
- Admin dashboard for managing subscribers
- Email templates and automated sending
- Analytics tracking for form submissions

## Security Considerations

- The component only collects email and optional name
- No sensitive data is stored
- IP addresses are intentionally not captured
- Firebase security rules prevent unauthorized access
- All data is stored in Firebase Firestore with proper access controls
