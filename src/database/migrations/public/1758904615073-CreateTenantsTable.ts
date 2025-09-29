import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTenantsTable1758904615073 implements MigrationInterface {
  name = 'CreateTenantsTable1758904615073';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tenants" (
        "id" SERIAL NOT NULL, 
        "name" text NOT NULL, 
        CONSTRAINT "UQ_32731f181236a46182a38c992a8" UNIQUE ("name"), 
        CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tenants"`);
  }
}
