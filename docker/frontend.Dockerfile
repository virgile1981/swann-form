FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src ./src


# Build du frontend
RUN npm install

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/frontend/package.json ./
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/node_modules ./node_modules
RUN addgroup -S nonroot \
  && adduser -S nonroot -G nonroot
USER nonroot
CMD ["npm", "run", "start"]