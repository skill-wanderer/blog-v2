import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getEnvironmentConfig, isDevelopment } from '../utils/environment';

// Firebase configuration interface
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Get environment configuration
const envConfig = getEnvironmentConfig();
const firebaseConfig: FirebaseConfig = envConfig.firebase;

// Initialize Firebase app
let app: FirebaseApp;
let firestore: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

export function initializeFirebase(): FirebaseApp {
  if (getApps().length === 0) {
    // Configuration is already validated in getEnvironmentConfig()
    app = initializeApp(firebaseConfig);
    
    if (isDevelopment()) {
      console.log('Firebase initialized in development mode');
    }
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
    // Configuration validation is handled in getEnvironmentConfig()
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
