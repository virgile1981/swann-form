FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY apps ./apps


# Build du frontend
RUN npm install
RUN npm install --cpu=x64 --os=linux --libc=glibc sharp
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build 

FROM node:20-slim AS runner
# Installer les dépendances pour Chrome/Puppeteer
# 1. Installer les dépendances système pour Sharp (libvips) et Puppeteer (Chromium)
USER root

RUN apt-get update && apt-get install -y \
    libxkbcommon0 \
    libnss3 \
    libatk-bridge2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libxfixes3 \
    libxshmfence1 \
    ca-certificates \
    fonts-liberation \
    lsb-release \
    xdg-utils \
    wget \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app/server


COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/dist/static ./static
COPY --from=builder /app/apps/backend/dist ./
COPY --from=builder /app/apps/backend/templates ./templates
RUN npx puppeteer browsers install chrome
CMD ["node", "server.js"]