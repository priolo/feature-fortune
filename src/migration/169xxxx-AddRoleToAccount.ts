import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRoleToAccount169xxxx implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // add column with default 'user'
    await queryRunner.addColumn(
      "account",
      new TableColumn({
        name: "role",
        type: "varchar",
        length: "32",
        isNullable: false,
        default: "'user'",
      })
    );

    // Ensure existing rows have the default (defensive)
    await queryRunner.query(`UPDATE "account" SET "role" = 'user' WHERE "role" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("account", "role");
  }
}