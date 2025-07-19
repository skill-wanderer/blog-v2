#!/usr/bin/env node

/**
 * Firebase Setup Script
 * This script helps you create a .env.local file with Firebase configuration
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupFirebase() {
  console.log('🔥 Firebase Configuration Setup');
  console.log('================================\n');
  
  // Check if .env.local already exists
  if (existsSync('.env.local')) {
    const overwrite = await question('.env.local already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
  }

  console.log('Please enter your Firebase configuration values.');
  console.log('You can find these in your Firebase Console > Project Settings > Your apps > Web app\n');

  const config = {
    apiKey: await question('Firebase API Key: '),
    authDomain: await question('Auth Domain (project-id.firebaseapp.com): '),
    projectId: await question('Project ID: '),
    storageBucket: await question('Storage Bucket (project-id.appspot.com): '),
    messagingSenderId: await question('Messaging Sender ID: '),
    appId: await question('App ID: '),
    measurementId: await question('Measurement ID (optional, for Analytics): ')
  };

  // Validate required fields
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields = requiredFields.filter(field => !config[field]);

  if (missingFields.length > 0) {
    console.log(`\n❌ Missing required fields: ${missingFields.join(', ')}`);
    console.log('Please run the script again with all required values.');
    rl.close();
    return;
  }

  // Create .env.local content
  const envContent = `# Firebase Configuration Environment Variables
# Generated on ${new Date().toISOString()}

# Firebase Project Configuration (PUBLIC_ prefix makes them available on client-side)
PUBLIC_FIREBASE_API_KEY=${config.apiKey}
PUBLIC_FIREBASE_AUTH_DOMAIN=${config.authDomain}
PUBLIC_FIREBASE_PROJECT_ID=${config.projectId}
PUBLIC_FIREBASE_STORAGE_BUCKET=${config.storageBucket}
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${config.messagingSenderId}
PUBLIC_FIREBASE_APP_ID=${config.appId}
${config.measurementId ? `PUBLIC_FIREBASE_MEASUREMENT_ID=${config.measurementId}` : '# PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id'}

# IMPORTANT: The PUBLIC_ prefix is required for Astro to make these variables
# available on the client-side where Firebase needs them.
`;

  // Write .env.local file
  writeFileSync('.env.local', envContent);

  console.log('\n✅ .env.local file created successfully!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Check browser console for "Firebase initialized successfully"');
  console.log('3. Test analytics tracking in your browser dev tools');
  console.log('\nFor production deployment, update k8s/firebase-secret.yaml with these values.');

  rl.close();
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\nSetup cancelled by user.');
  rl.close();
  process.exit(0);
});

setupFirebase().catch(error => {
  console.error('Error during setup:', error);
  rl.close();
  process.exit(1);
});
