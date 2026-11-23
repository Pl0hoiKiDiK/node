FROM node:24.22.3-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/core/package.json apps/core/package.json
COPY apps/auth/package.json apps/auth/package.json
COPY apps/notifications/package.json apps/notifications/package.json
COPY apps/client/package.json apps/client/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm ci

COPY packages/shared packages/shared
RUN npm run build --workspace @innogram/shared
COPY apps/notifications apps/notifications
RUN npm run build --workspace notifications

ENV NODE_ENV=production PORT=3003
EXPOSE 3003
CMD ["npm", "run", "start:prod", "--workspace", "notifications"]
