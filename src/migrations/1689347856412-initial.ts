import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1689347856412 implements MigrationInterface {
    name = 'Initial1689347856412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lotes" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6eda564423c09706b95cbf8ae1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boletos" ("id" SERIAL NOT NULL, "nome_sacado" character varying(255) NOT NULL, "valor" numeric(5,2) NOT NULL, "linha_digitavel" character varying(255) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "id_lote" integer, CONSTRAINT "PK_c4b38689a32d5f2f065f98d593a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boletos" ADD CONSTRAINT "FK_6fa81b38e62d2094a467bc75b0e" FOREIGN KEY ("id_lote") REFERENCES "lotes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boletos" DROP CONSTRAINT "FK_6fa81b38e62d2094a467bc75b0e"`);
        await queryRunner.query(`DROP TABLE "boletos"`);
        await queryRunner.query(`DROP TABLE "lotes"`);
    }

}
