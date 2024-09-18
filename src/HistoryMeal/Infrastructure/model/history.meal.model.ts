import { DataTypes, Model } from 'sequelize';
import Meal from 'src/Meal/infrastructure/model/meal.model';
import { sequelize } from 'src/Shared/infrastructure/db/db.sequelize.config';
import User from 'src/user/infrastructure/models/user.models';

class HistoryMeal extends Model {
  declare id:string
  declare userId: string;
  declare mealId: string;
  declare updateAt: Date;
  declare createAt: Date;
}

HistoryMeal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    mealId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'HistoryMeal',
    timestamps: true,
  },
);
HistoryMeal.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user',
});
HistoryMeal.belongsTo(Meal, {
  foreignKey: 'mealId',
  targetKey: 'id',
  as: 'meal',
});

export default HistoryMeal;
