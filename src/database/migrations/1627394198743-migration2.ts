import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class migration21627394198743 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "genres",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true

          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true

          },
          {
            name: "usersId",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "orders_games",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true

          },
          {
            name: "gamesId",
            type: "uuid",
          },
          {
            name: "ordersId",
            type: "uuid",
          },
          {
            name: "amount",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "games_genres",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true

          },
          {
            name: "gamesId",
            type: "uuid",
          },
          {
            name: "genresId",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );

    await queryRunner.createForeignKey("orders", new TableForeignKey({
      columnNames: ["usersId"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE",
      onUpdate: "NO ACTION"
    }));

    await queryRunner.createForeignKey("orders_games", new TableForeignKey({
      columnNames: ["gamesId"],
      referencedColumnNames: ["id"],
      referencedTableName: "games",
      onDelete: "CASCADE",
      onUpdate: "NO ACTION"
    }));

    await queryRunner.createForeignKey("orders_games", new TableForeignKey({
      columnNames: ["ordersId"],
      referencedColumnNames: ["id"],
      referencedTableName: "orders",
      onDelete: "CASCADE",
      onUpdate: "NO ACTION"
    }));

    await queryRunner.createForeignKey("games_genres", new TableForeignKey({
      columnNames: ["gamesId"],
      referencedColumnNames: ["id"],
      referencedTableName: "games",
      onDelete: "CASCADE",
      onUpdate: "NO ACTION"
    }));

    await queryRunner.createForeignKey("games_genres", new TableForeignKey({
      columnNames: ["genresId"],
      referencedColumnNames: ["id"],
      referencedTableName: "genres",
      onDelete: "CASCADE",
      onUpdate: "NO ACTION"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders_games");
    await queryRunner.dropTable("games_genres");
    await queryRunner.dropTable("genres");
    await queryRunner.dropTable("orders");
  }

}
