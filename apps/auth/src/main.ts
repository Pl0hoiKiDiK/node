import express from 'express';
import { HEALTH_STATUS, type HealthResponse } from '@innogram/shared';

const app = express();

app.get('/health', (_request, response) => {
  const healthResponse: HealthResponse = { status: HEALTH_STATUS.OK };
  response.json(healthResponse);
});

const port = Number(process.env.PORT ?? 3002);
app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
