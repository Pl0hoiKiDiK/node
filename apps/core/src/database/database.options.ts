import { join } from 'node:path';
import type { DataSourceOptions } from 'typeorm';

export function getDatabaseOptions(): DataSourceOptions {
  const databaseUrl = process.env.DATABASE_URL;
  const username = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const database = process.env.POSTGRES_DB;
  const port = Number(process.env.POSTGRES_PORT ?? 5432);

  if (!databaseUrl && (!username || !password || !database)) {
    throw new Error(
      'Set DATABASE_URL or POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB for the Core API',
    );
  }
  if (!databaseUrl && (!Number.isInteger(port) || port < 1 || port > 65535)) {
    throw new Error('POSTGRES_PORT must be a valid TCP port');
  }

  return {
    type: 'postgres',
    ...(databaseUrl
      ? { url: databaseUrl }
      : {
          host: process.env.POSTGRES_HOST ?? 'localhost',
          port,
          username,
          password,
          database,
        }),
    entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
    migrations: [join(__dirname, 'migrations', '*.js')],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    synchronize: false,
  };
}
