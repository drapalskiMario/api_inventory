import { MigrationInterface, QueryRunner } from 'typeorm'

export class addedSoftDeleteInTables1632364290951
  implements MigrationInterface
{
  name = 'addedSoftDeleteInTables1632364290951'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."ingredient" ADD "deleted_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "deleted_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."component" ADD "deleted_at" TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "deleted_at" TIMESTAMP`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "deleted_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."component" DROP COLUMN "deleted_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "deleted_at"`
    )
    await queryRunner.query(
      `ALTER TABLE "public"."ingredient" DROP COLUMN "deleted_at"`
    )
  }
}
