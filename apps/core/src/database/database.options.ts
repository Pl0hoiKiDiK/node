import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseEnv } from 'node:util';
import type { DataSourceOptions } from 'typeorm';

const localEnvFile = resolve(__dirname, '../../../../.env');

export function getDatabaseOptions(): DataSourceOptions {
  const localEnv = existsSync(localEnvFile)
    ? parseEnv(readFileSync(localEnvFile, 'utf8'))
    : {};
  const value = (name: string): string | undefined =>
    process.env[name] ?? localEnv[name];

  const databaseUrl = value('DATABASE_URL');
  const username = value('POSTGRES_USER');
  const password = value('POSTGRES_PASSWORD');
  const database = value('POSTGRES_DB');
  const port = Number(value('POSTGRES_PORT') ?? 5432);

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
          host: value('POSTGRES_HOST') ?? 'localhost',
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
