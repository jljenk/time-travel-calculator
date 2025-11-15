# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN pnpm install
# Build with verbose output
RUN echo "Building backend..." && pnpm --filter backend build
RUN echo "Building frontend..." && pnpm --filter frontend build
# Verify build outputs exist
RUN test -d apps/backend/dist || (echo "Backend dist directory not found" && exit 1)
RUN test -d apps/frontend/dist || (echo "Frontend dist directory not found" && exit 1)

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/backend/package.json ./backend/
COPY --from=builder /app/apps/backend/dist ./backend
COPY --from=builder /app/apps/frontend/dist ./frontend
WORKDIR /app/backend
RUN npm install --production
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "server.js"]

