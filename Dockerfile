# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN pnpm install
RUN pnpm build

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/backend/package.json ./backend/
COPY --from=builder /app/apps/backend/dist ./backend
COPY --from=builder /app/apps/frontend/dist ./frontend
WORKDIR /app/backend
RUN npm install --production
WORKDIR /app
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "backend/server.js"]

