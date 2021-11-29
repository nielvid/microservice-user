//import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
//const dotenv = require('dotenv');

// import { DatabaseType } from 'typeorm';
// import { User } from './src/entities/user.entity';
// import { Company } from './src/entities/company.entity';
//dotenv.config();
const config = {
  type: 'mysql',
  host: `${process.env.DB_HOST}`,
  database: `${process.env.DB_DATABASE}`,
  port: +process.env.DB_PORT,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, //change to false in production
  // connectTimeout: 1000000,
  migrationsTableName: 'custom_migration_table',
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  cache: {
    type: 'database',
    duration: 30000, // 30 seconds
    ignoreErrors: true,
  },
};

module.exports = config;
//export default config;
