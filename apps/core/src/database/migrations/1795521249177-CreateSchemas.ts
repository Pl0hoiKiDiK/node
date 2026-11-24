import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchemas1795521249177 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('auth', true);
    await queryRunner.createSchema('main', true);
    await queryRunner.createSchema('notification', true);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('notification', true);
    await queryRunner.dropSchema('main', true);
    await queryRunner.dropSchema('auth', true);
  }
}
