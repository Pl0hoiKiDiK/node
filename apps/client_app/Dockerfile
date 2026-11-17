FROM node:24.22.3-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/core_microservice/package.json apps/core_microservice/package.json
COPY apps/auth_microservice/package.json apps/auth_microservice/package.json
COPY apps/notifications_consumer_microservice/package.json apps/notifications_consumer_microservice/package.json
COPY apps/client_app/package.json apps/client_app/package.json
RUN npm ci

COPY apps/client_app apps/client_app
RUN npm run build --workspace client_app

ENV NODE_ENV=production PORT=3000
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace", "client_app"]
