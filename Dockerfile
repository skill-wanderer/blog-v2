# Multi-approach Dockerfile for Astro blog
# Approach 1: Multi-stage build (preferred for CI/CD)
FROM node:18 AS builder

# Set working directory
WORKDIR /app

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