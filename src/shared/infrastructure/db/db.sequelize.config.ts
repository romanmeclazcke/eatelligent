import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host:process.env.HOST,
    dialect: "mysql"
});




export const syncDatabase = async () => {
    try {
      await sequelize.sync();
      console.log('Base de datos y modelos sincronizados correctamente.');
    } catch (error) {
      throw new Error("Error al sincronizar las bases de datos"+ error);
    }
};


