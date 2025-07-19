import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// Firebase configuration interface
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Environment variables with fallbacks for development
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || '',
};


// Validate Firebase configuration
function validateFirebaseConfig(config: FirebaseConfig): void {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  
  for (const field of requiredFields) {
    if (!config[field as keyof FirebaseConfig]) {
      throw new Error(`Firebase configuration error: ${field} is required but not provided`);
    }
  }
}

// Initialize Firebase app
let app: FirebaseApp;
let firestore: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

export function initializeFirebase(): FirebaseApp {
  if (getApps().length === 0) {
    // Validate configuration before initializing
    validateFirebaseConfig(firebaseConfig);
    
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    console.log('Firebase initialized successfully');
  } else {
    app = getApps()[0];
  }
  
  return app;
}

// Initialize Firebase services
export function getFirebaseFirestore(): Firestore {
  if (!firestore) {
    const app = initializeFirebase();
    firestore = getFirestore(app);
  }
  return firestore;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    const app = initializeFirebase();
    auth = getAuth(app);
  }
  return auth;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) {
    const app = initializeFirebase();
    storage = getStorage(app);
  }
  return storage;
}

// Export Firebase app instance
export function getFirebaseApp(): FirebaseApp {
  return initializeFirebase();
}

// Utility function to check if Firebase is properly configured
export function isFirebaseConfigured(): boolean {
  try {
    validateFirebaseConfig(firebaseConfig);
    return true;
  } catch {
    return false;
  }
}

// Export config for debugging purposes (only in development)
export function getFirebaseConfig(): Partial<FirebaseConfig> {
  if (import.meta.env.DEV || process.env.NODE_ENV === 'development') {
    return {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      storageBucket: firebaseConfig.storageBucket,
    };
  }
  return {};
}
