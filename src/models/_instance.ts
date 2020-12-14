import { Sequelize } from 'sequelize-typescript';
import models from '.';

const env = process.env.NODE_ENV || 'development';

// config는 require방식으로 받아야하는듯
const config = require('../config/database')[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    logQueryParameters: true,
    models: Object.values(models),
  },
);
