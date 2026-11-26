import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = app.get(DataSource);
  }, 30_000);

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('connects to PostgreSQL with all required schemas', async () => {
    expect(dataSource.isInitialized).toBe(true);

    const schemas: { schema_name: string }[] = await dataSource.query(
      'SELECT schema_name FROM information_schema.schemata WHERE schema_name = ANY($1) ORDER BY schema_name',
      [['auth', 'main', 'notification']],
    );

    expect(schemas.map(({ schema_name }) => schema_name)).toEqual([
      'auth',
      'main',
      'notification',
    ]);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
