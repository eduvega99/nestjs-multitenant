import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsTable1761151390361 implements MigrationInterface {
  name = 'CreateClientsTable1761151390361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "clients" (
        "id" SERIAL NOT NULL,
        "name" text NOT NULL,
        "email" text NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"),
        CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "clients"`);
  }
}
