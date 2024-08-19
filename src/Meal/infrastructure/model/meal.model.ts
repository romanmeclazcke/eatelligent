import { DataTypes, Model } from 'sequelize';
import MealProduct from 'src/MealProduct/infrastructure/model/meal.product.model';
import Product from 'src/Product/infrastructure/model/product.model';
import { sequelize } from 'src/shared/infrastructure/db/db.sequelize.config';

class Meal extends Model {
    declare id: string;
    declare name:string
    declare image:string
    declare recipe:string
    declare calories: number
    declare protein: number
    declare carbohydrates: number
    declare glutenFree:boolean
}

Meal.init(
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
    mealPicture:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    recipe:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    calories:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    protein:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    carbohydrates:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    glutenFree:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    }
  },
  {
    sequelize, 
    tableName: 'Meal',
    timestamps: true,
    indexes: [
        { unique: true, fields: ['name']},
    ]
  },
);


// Meal.belongsToMany(Product, {
//     through: MealProduct,
//     foreignKey: 'productId',
//     otherKey: 'mealId',
//     as: 'products',
// });


export default Meal