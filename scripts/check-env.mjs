#!/usr/bin/env node

/**
 * Environment Configuration Checker
 * Validates that all required environment variables are properly set
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Required environment variables for Firebase
const REQUIRED_VARS = [
  'PUBLIC_FIREBASE_API_KEY',
  'PUBLIC_FIREBASE_AUTH_DOMAIN',
  'PUBLIC_FIREBASE_PROJECT_ID',
  'PUBLIC_FIREBASE_STORAGE_BUCKET',
  'PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'PUBLIC_FIREBASE_APP_ID'
];

// Production environment variables (without PUBLIC_ prefix)
const PRODUCTION_VARS = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN', 
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

function loadEnvFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const env = {};
    
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
    
    return env;
  } catch (error) {
    return null;
  }
}

function checkEnvironment() {
  console.log('🔍 Checking Environment Configuration...\n');
  
  const projectRoot = join(__dirname, '..');
  const envLocal = loadEnvFile(join(projectRoot, '.env.local'));
  const envProduction = loadEnvFile(join(projectRoot, '.env.production'));
  
  let hasErrors = false;
  
  // Check .env.local (development)
  console.log('📋 Development Environment (.env.local):');
  if (!envLocal) {
    console.log('❌ .env.local file not found');
    console.log('   Copy .env.example to .env.local and configure your values\n');
    hasErrors = true;
  } else {
    const missing = REQUIRED_VARS.filter(varName => !envLocal[varName] || envLocal[varName].includes('your-'));
    
    if (missing.length === 0) {
      console.log('✅ All required variables are configured\n');
    } else {
      console.log('❌ Missing or incomplete variables:');
      missing.forEach(varName => {
        console.log(`   - ${varName}`);
      });
      console.log('');
      hasErrors = true;
    }
  }
  
  // Check .env.production
  console.log('🚀 Production Environment (.env.production):');
  if (!envProduction) {
    console.log('❌ .env.production file not found\n');
    hasErrors = true;
  } else {
    console.log('✅ Production environment file exists\n');
  }
  
  // Check current process environment for production variables
  console.log('🌐 Current Process Environment:');
  const currentEnv = process.env;
  const missingProd = PRODUCTION_VARS.filter(varName => !currentEnv[varName]);
  
  if (missingProd.length === 0) {
    console.log('✅ All production variables are set in current environment\n');
  } else {
    console.log('ℹ️  Production variables not set in current environment:');
    missingProd.forEach(varName => {
      console.log(`   - ${varName}`);
    });
    console.log('   (This is normal for local development)\n');
  }
  
  // Deployment instructions
  console.log('📚 Deployment Instructions:');
  console.log('');
  console.log('For Vercel:');
  console.log('  vercel env add FIREBASE_API_KEY');
  console.log('  vercel env add FIREBASE_AUTH_DOMAIN');
  console.log('  vercel env add FIREBASE_PROJECT_ID');
  console.log('  vercel env add FIREBASE_STORAGE_BUCKET');
  console.log('  vercel env add FIREBASE_MESSAGING_SENDER_ID');
  console.log('  vercel env add FIREBASE_APP_ID');
  console.log('');
  console.log('For Netlify:');
  console.log('  Add environment variables in your site settings');
  console.log('');
  console.log('For other platforms:');
  console.log('  Set the FIREBASE_* environment variables in your hosting platform');
  console.log('');
  
  if (hasErrors) {
    console.log('❌ Configuration issues found. Please fix them before deploying.');
    process.exit(1);
  } else {
    console.log('✅ Environment configuration looks good!');
  }
}

checkEnvironment();
