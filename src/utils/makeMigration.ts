import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration';
import path from 'path';
import { sequelize } from '@models/_instance';

SequelizeTypescriptMigration.makeMigration(sequelize, {
  outDir: path.join(__dirname, '../migrations'),
  migrationName: Date.now() + '-create-tables',
  preview: false,
});
