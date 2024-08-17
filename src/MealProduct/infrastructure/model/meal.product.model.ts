import { DataTypes, Model } from 'sequelize';
import Meal from 'src/Meal/infrastructure/model/meal.model';
import Product from 'src/Product/infrastructure/model/product.model';
import { sequelize } from 'src/shared/infrastructure/db/db.sequelize.config';

class MealProduct extends Model {
    declare id: string;
    declare mealId: string;
    declare productId: string;
}

MealProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    }
  },
  {
    sequelize, 
    tableName: 'MealProduct',
    timestamps: true
  },
);

MealProduct.belongsTo(Product, { foreignKey: 'productId', targetKey: 'id', as: 'ingredient' });
MealProduct.belongsTo(Meal, { foreignKey: 'mealId', targetKey: 'id', as: 'meal' });

export default MealProduct