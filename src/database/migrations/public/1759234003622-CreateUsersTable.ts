import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1759234003622 implements MigrationInterface {
  name = 'CreateUsersTable1759234003622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "username" text NOT NULL,
        "password" text NOT NULL,
        "tenantId" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "users"
        ADD CONSTRAINT "FK_c58f7e88c286e5e3478960a998b"
        FOREIGN KEY ("tenantId") REFERENCES "tenants"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
        DROP CONSTRAINT "FK_c58f7e88c286e5e3478960a998b"
    `);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
