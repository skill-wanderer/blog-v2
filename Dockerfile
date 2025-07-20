# Multi-approach Dockerfile for Astro blog
# Approach 1: Multi-stage build (preferred for CI/CD)
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Define build arguments for Firebase configuration
ARG PUBLIC_FIREBASE_API_KEY
ARG PUBLIC_FIREBASE_AUTH_DOMAIN
ARG PUBLIC_FIREBASE_PROJECT_ID
ARG PUBLIC_FIREBASE_STORAGE_BUCKET
ARG PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG PUBLIC_FIREBASE_APP_ID
ARG PUBLIC_FIREBASE_MEASUREMENT_ID

# Set environment variables from build arguments
ENV PUBLIC_FIREBASE_API_KEY=$PUBLIC_FIREBASE_API_KEY
ENV PUBLIC_FIREBASE_AUTH_DOMAIN=$PUBLIC_FIREBASE_AUTH_DOMAIN
ENV PUBLIC_FIREBASE_PROJECT_ID=$PUBLIC_FIREBASE_PROJECT_ID
ENV PUBLIC_FIREBASE_STORAGE_BUCKET=$PUBLIC_FIREBASE_STORAGE_BUCKET
ENV PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV PUBLIC_FIREBASE_APP_ID=$PUBLIC_FIREBASE_APP_ID
ENV PUBLIC_FIREBASE_MEASUREMENT_ID=$PUBLIC_FIREBASE_MEASUREMENT_ID

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application - try multiple approaches
RUN npm run build || npx astro build || ./node_modules/.bin/astro build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Alternative approach for local development:
# 1. Build locally: npm run build
# 2. Use Dockerfile.simple for quick deployment