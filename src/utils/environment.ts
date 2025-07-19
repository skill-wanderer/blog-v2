/**
 * Environment Configuration Utility
 * Handles environment variable validation and provides type-safe access
 */

export interface EnvironmentConfig {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  environment: 'development' | 'production' | 'preview';
}

/**
 * Validates that all required environment variables are present
 */
function validateEnvironmentVariables(): void {
  const requiredVars = [
    'PUBLIC_FIREBASE_API_KEY',
    'PUBLIC_FIREBASE_AUTH_DOMAIN',
    'PUBLIC_FIREBASE_PROJECT_ID',
    'PUBLIC_FIREBASE_STORAGE_BUCKET',
    'PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'PUBLIC_FIREBASE_APP_ID'
  ];

  const missing = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file for development or ensure these are set in production.'
    );
  }
}

/**
 * Gets the current environment configuration with validation
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  // Validate environment variables first
  validateEnvironmentVariables();

  const environment = (import.meta.env.NODE_ENV || 'development') as 'development' | 'production' | 'preview';

  return {
    firebase: {
      apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
      authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
    },
    environment,
  };
}

/**
 * Checks if we're running in development mode
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV || import.meta.env.NODE_ENV === 'development';
}

/**
 * Checks if we're running in production mode
 */
export function isProduction(): boolean {
  return import.meta.env.PROD || import.meta.env.NODE_ENV === 'production';
}

/**
 * Gets environment-specific configuration
 */
export function getEnvironmentSpecificConfig() {
  const config = getEnvironmentConfig();
  
  return {
    ...config,
    // Environment-specific settings
    enableAnalytics: isProduction(),
    debugMode: isDevelopment(),
    logLevel: isDevelopment() ? 'debug' : 'warn',
  };
}
