import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE as string,
  process.env.USER as string,
  process.env.PASSWORD as string,
  {
    host: process.env.HOST,
    dialect: 'mysql',
  }
);

export const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Base de datos y modelos sincronizados correctamente.');
  } catch (error) {
    console.error('Error al sincronizar las bases de datos:', error.message);
    throw new Error('Error al sincronizar las bases de datos: ' + error.message);
  }
};
