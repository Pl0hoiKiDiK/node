FROM node:24.22.3-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/core_microservice/package.json apps/core_microservice/package.json
COPY apps/auth_microservice/package.json apps/auth_microservice/package.json
COPY apps/notifications_consumer_microservice/package.json apps/notifications_consumer_microservice/package.json
COPY apps/client_app/package.json apps/client_app/package.json
RUN npm ci

COPY apps/auth_microservice apps/auth_microservice
RUN npm run build --workspace auth_microservice

ENV NODE_ENV=production PORT=3002
EXPOSE 3002
CMD ["npm", "run", "start", "--workspace", "auth_microservice"]
