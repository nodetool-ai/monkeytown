# syntax=docker/dockerfile:1.4

# ============================================
# Monkeytown Complete Application
# ============================================
# Builds all services: web, server, and shared packages

# ----------------------------------------------------------------
# Stage 1: Shared Dependencies
# ----------------------------------------------------------------
FROM node:20-alpine AS shared-deps
WORKDIR /app

COPY packages/shared/package.json packages/shared/package-lock.json* ./
RUN npm ci --only=production

# ----------------------------------------------------------------
# Stage 2: Server Build
# ----------------------------------------------------------------
FROM node:20-alpine AS server-builder
WORKDIR /app

COPY server/package.json server/package-lock.json* ./
RUN npm ci

COPY . .
WORKDIR /app/server
RUN npm run build

# ----------------------------------------------------------------
# Stage 3: Web Build
# ----------------------------------------------------------------
FROM node:20-alpine AS web-builder
WORKDIR /app

COPY web/package.json web/package-lock.json* ./
RUN npm ci

COPY . .
WORKDIR /app/web
RUN npm run build

# ----------------------------------------------------------------
# Stage 4: Production Assembly
# ----------------------------------------------------------------
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S monkeytown -u 1001

# Copy shared dependencies
COPY --from=shared-deps /app/node_modules ./shared/node_modules

# Copy server
COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=server-builder /app/server/package.json ./server/
COPY --from=server-builder /app/node_modules ./server/node_modules

# Copy web
COPY --from=web-builder /app/web/dist ./web/dist
COPY --from=web-builder /app/web/package.json ./web/

# Change ownership
RUN chown -R monkeytown:nodejs /app
USER monkeytown

# Expose both ports
EXPOSE 3000 8080

# Entrypoint handles which service to run
COPY <<EOF /entrypoint.sh
#!/bin/sh
set -e

if [ "\${SERVICE:-web}" = "web" ]; then
  cd /app/web
  exec npm start
elif [ "\${SERVICE:-server}" = "server" ]; then
  cd /app/server
  exec npm start
else
  echo "Unknown service: \$SERVICE"
  exit 1
fi
EOF

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["sh", "-c", "SERVICE=\${SERVICE:-web} /entrypoint.sh"]
