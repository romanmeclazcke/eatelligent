import { DataTypes, Model } from 'sequelize';
import Meal from 'src/Meal/infrastructure/model/meal.model';
import { sequelize } from 'src/Shared/infrastructure/db/db.sequelize.config';
import User from 'src/user/infrastructure/models/user.models';

class FavoriteMeal extends Model {
  declare id: string;
  declare userId: string;
  declare mealId: string;
  declare createdAt:Date
}

FavoriteMeal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,  // Usa 'id' como clave primaria
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    mealId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'FavoriteMeal',
    timestamps: true, // Esto manejará `createdAt` y `updatedAt`
  },
);

// Asociaciones
FavoriteMeal.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'userFavorites' });
FavoriteMeal.belongsTo(Meal, { foreignKey: 'mealId', targetKey: 'id', as: 'favoriteMeal' });

export default FavoriteMeal;
