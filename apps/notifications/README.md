# Notifications consumer

This NestJS application is the starting point for processing notifications. It currently exposes `GET /health`, returning `{"status":"ok"}`. RabbitMQ consumption and email delivery will be added in later feature PRs.

From the repository root, run `npm ci`, `npm run build --workspace @innogram/shared`, and then `npm run dev --workspace notifications`. The default port is 3003; set the `PORT` environment variable to change it. The app reads variables from the process environment.

Check the service with `npm run lint --workspace notifications`, `npm run typecheck --workspace notifications`, and `npm run build --workspace notifications`. Run the built service with `npm run start:prod --workspace notifications`.
