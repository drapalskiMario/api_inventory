import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUniqueKeyAndPrice1632592017666 implements MigrationInterface {
    name = 'addUniqueKeyAndPrice1632592017666'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "public"."ingredient" ADD "unit_price" numeric(6,2) NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"')
        await queryRunner.query('ALTER TABLE "public"."ingredient" DROP COLUMN "unit_price"')
    }
}
