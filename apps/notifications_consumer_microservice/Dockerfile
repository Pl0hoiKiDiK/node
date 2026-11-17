FROM node:24.22.3-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/core_microservice/package.json apps/core_microservice/package.json
COPY apps/auth_microservice/package.json apps/auth_microservice/package.json
COPY apps/notifications_consumer_microservice/package.json apps/notifications_consumer_microservice/package.json
COPY apps/client_app/package.json apps/client_app/package.json
RUN npm ci

COPY apps/notifications_consumer_microservice apps/notifications_consumer_microservice
RUN npm run build --workspace notifications_consumer_microservice

ENV NODE_ENV=production PORT=3003
EXPOSE 3003
CMD ["npm", "run", "start:prod", "--workspace", "notifications_consumer_microservice"]
