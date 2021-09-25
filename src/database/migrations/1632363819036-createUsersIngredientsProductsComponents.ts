import { MigrationInterface, QueryRunner } from 'typeorm'

export class createUsersIngredientsProductsComponents1632363819036
  implements MigrationInterface {
  name = 'createUsersIngredientsProductsComponents1632363819036'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "ingredient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "unit_measurement" character varying NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(6,2) NOT NULL, "uri_image" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "id_ingredient" uuid, "id_product" uuid, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "component" ADD CONSTRAINT "FK_cbd1c84ff5973ad95dd9340ec65" FOREIGN KEY ("id_ingredient") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "component" ADD CONSTRAINT "FK_ad1b6be10c5ae7d4cc72b654e35" FOREIGN KEY ("id_product") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "component" DROP CONSTRAINT "FK_ad1b6be10c5ae7d4cc72b654e35"'
    )
    await queryRunner.query(
      'ALTER TABLE "component" DROP CONSTRAINT "FK_cbd1c84ff5973ad95dd9340ec65"'
    )
    await queryRunner.query('DROP TABLE "user"')
    await queryRunner.query('DROP TABLE "component"')
    await queryRunner.query('DROP TABLE "product"')
    await queryRunner.query('DROP TABLE "ingredient"')
  }
}
