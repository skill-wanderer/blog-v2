# Production Environment Setup Script for Windows
# This script helps configure environment variables for production deployment

param(
    [Parameter(Mandatory=$false)]
    [string]$Platform = "",
    
    [Parameter(Mandatory=$false)]
    [switch]$Check,
    
    [Parameter(Mandatory=$false)]
    [switch]$Help
)

function Show-Help {
    Write-Host "Environment Setup Script for Blog V2" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\setup-environment.ps1 -Check              # Check current environment"
    Write-Host "  .\setup-environment.ps1 -Platform vercel    # Setup for Vercel"
    Write-Host "  .\setup-environment.ps1 -Platform netlify   # Setup for Netlify"
    Write-Host "  .\setup-environment.ps1 -Help               # Show this help"
    Write-Host ""
    Write-Host "Required Environment Variables:" -ForegroundColor Yellow
    Write-Host "  FIREBASE_API_KEY"
    Write-Host "  FIREBASE_AUTH_DOMAIN"
    Write-Host "  FIREBASE_PROJECT_ID"
    Write-Host "  FIREBASE_STORAGE_BUCKET"
    Write-Host "  FIREBASE_MESSAGING_SENDER_ID"
    Write-Host "  FIREBASE_APP_ID"
}

function Test-EnvironmentConfiguration {
    Write-Host "🔍 Checking Environment Configuration..." -ForegroundColor Blue
    Write-Host ""
    
    $requiredVars = @(
        "FIREBASE_API_KEY",
        "FIREBASE_AUTH_DOMAIN", 
        "FIREBASE_PROJECT_ID",
        "FIREBASE_STORAGE_BUCKET",
        "FIREBASE_MESSAGING_SENDER_ID",
        "FIREBASE_APP_ID"
    )
    
    $missing = @()
    
    foreach ($var in $requiredVars) {
        $value = [Environment]::GetEnvironmentVariable($var)
        if ([string]::IsNullOrEmpty($value)) {
            $missing += $var
        } else {
            Write-Host "✅ $var is set" -ForegroundColor Green
        }
    }
    
    if ($missing.Count -eq 0) {
        Write-Host ""
        Write-Host "✅ All environment variables are configured!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Missing environment variables:" -ForegroundColor Red
        foreach ($var in $missing) {
            Write-Host "   - $var" -ForegroundColor Red
        }
    }
    
    # Check .env.local file
    if (Test-Path ".env.local") {
        Write-Host ""
        Write-Host "✅ .env.local file exists for development" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "⚠️  .env.local file not found" -ForegroundColor Yellow
        Write-Host "   Copy .env.example to .env.local for development" -ForegroundColor Yellow
    }
}

function Setup-VercelEnvironment {
    Write-Host "🚀 Setting up Vercel Environment..." -ForegroundColor Blue
    Write-Host ""
    
    # Check if Vercel CLI is installed
    try {
        $vercelVersion = vercel --version 2>$null
        Write-Host "✅ Vercel CLI is installed: $vercelVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
        npm install -g vercel
    }
    
    Write-Host ""
    Write-Host "Setting environment variables in Vercel..." -ForegroundColor Yellow
    
    $vars = @(
        "FIREBASE_API_KEY",
        "FIREBASE_AUTH_DOMAIN",
        "FIREBASE_PROJECT_ID", 
        "FIREBASE_STORAGE_BUCKET",
        "FIREBASE_MESSAGING_SENDER_ID",
        "FIREBASE_APP_ID"
    )
    
    foreach ($var in $vars) {
        Write-Host "Adding $var..." -ForegroundColor Cyan
        vercel env add $var
    }
    
    Write-Host ""
    Write-Host "✅ Vercel environment setup complete!" -ForegroundColor Green
    Write-Host "Run 'vercel --prod' to deploy" -ForegroundColor Yellow
}

function Setup-NetlifyEnvironment {
    Write-Host "🚀 Setting up Netlify Environment..." -ForegroundColor Blue
    Write-Host ""
    
    Write-Host "For Netlify, you need to manually add environment variables:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Go to your Netlify site dashboard" -ForegroundColor Cyan
    Write-Host "2. Navigate to Site Settings > Environment Variables" -ForegroundColor Cyan
    Write-Host "3. Add these variables:" -ForegroundColor Cyan
    Write-Host ""
    
    $vars = @(
        "FIREBASE_API_KEY",
        "FIREBASE_AUTH_DOMAIN",
        "FIREBASE_PROJECT_ID",
        "FIREBASE_STORAGE_BUCKET", 
        "FIREBASE_MESSAGING_SENDER_ID",
        "FIREBASE_APP_ID"
    )
    
    foreach ($var in $vars) {
        Write-Host "   - $var" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "4. Deploy your site" -ForegroundColor Cyan
}

# Main script logic
if ($Help) {
    Show-Help
    exit 0
}

if ($Check) {
    Test-EnvironmentConfiguration
    exit 0
}

switch ($Platform.ToLower()) {
    "vercel" {
        Setup-VercelEnvironment
    }
    "netlify" {
        Setup-NetlifyEnvironment
    }
    default {
        if ($Platform -ne "") {
            Write-Host "❌ Unknown platform: $Platform" -ForegroundColor Red
            Write-Host ""
        }
        Show-Help
    }
}
