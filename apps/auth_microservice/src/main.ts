import express from 'express';

const app = express();

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

const port = Number(process.env.PORT ?? 3002);
app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
