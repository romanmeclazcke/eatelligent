import { DataTypes, Model } from 'sequelize';
import Meal from 'src/Meal/infrastructure/model/meal.model';
import MealProduct from 'src/MealProduct/infrastructure/model/meal.product.model';
import { sequelize } from 'src/shared/infrastructure/db/db.sequelize.config';

class Product extends Model {
    declare id: string;
    declare name: string;
    declare image: string;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize, 
    tableName: 'Product',
    timestamps: true,
    indexes: [
        { unique: true, fields: ['name']},
    ]
  },
);


Product.belongsToMany(Meal, {
  through: MealProduct,
  foreignKey: 'productId',
  otherKey: 'mealId',
  as: 'meals',
});


export default Product