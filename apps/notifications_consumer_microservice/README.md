# Notifications consumer

This NestJS application is the starting point for processing notifications. It currently exposes `GET /health`, returning `{"status":"ok"}`. RabbitMQ consumption and email delivery will be added in later feature PRs.

From the repository root, run `npm ci` and then `npm run dev --workspace notifications_consumer_microservice`. The default port is 3003; set the `PORT` environment variable to change it. The app reads variables from the process environment.

Check the service with `npm run lint --workspace notifications_consumer_microservice`, `npm run typecheck --workspace notifications_consumer_microservice`, and `npm run build --workspace notifications_consumer_microservice`. Run the built service with `npm run start:prod --workspace notifications_consumer_microservice`.
