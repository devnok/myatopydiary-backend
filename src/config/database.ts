require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    timezone: process.env.DB_TIMEZONE,
    dialect: 'mysql',
    define: {
      charset: process.env.DB_CHARSET,
      collate: process.env.DB_COLLATE,
      dialectOptions: {
        collate: process.env.DB_COLLATE,
      },
    },
  },
  staging: {
    username: process.env.STAGING_DB_USERNAME,
    password: process.env.STAGING_DB_PASSWORD,
    database: process.env.STAGING_DB_DATABASE,
    host: process.env.STAGING_DB_HOST,
    port: Number(process.env.STAGING_DB_PORT),
    dialect: 'mysql',
    timezone: process.env.STAGING_DB_TIMEZONE,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    port: Number(process.env.PROD_DB_PORT),
    dialect: 'mysql',
    timezone: process.env.PROD_DB_TIMEZONE,
  },
};
