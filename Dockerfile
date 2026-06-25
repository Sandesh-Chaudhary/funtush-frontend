# -------------------------
# 1. Builder Stage
# -------------------------
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# -------------------------
# 2. Build Stage
# -------------------------
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# -------------------------
# 3. Production Stage
# -------------------------
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder --chown=appuser:appgroup /app/public ./public
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static

EXPOSE 3000
USER appuser

CMD ["node", "server.js"]
