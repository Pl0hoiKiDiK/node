FROM node:24.22.3-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/core_microservice/package.json apps/core_microservice/package.json
COPY apps/auth_microservice/package.json apps/auth_microservice/package.json
COPY apps/notifications_consumer_microservice/package.json apps/notifications_consumer_microservice/package.json
COPY apps/client_app/package.json apps/client_app/package.json
RUN npm ci

COPY apps/core_microservice apps/core_microservice
RUN npm run build --workspace core_microservice

ENV NODE_ENV=production PORT=3001
EXPOSE 3001
CMD ["npm", "run", "start:prod", "--workspace", "core_microservice"]
