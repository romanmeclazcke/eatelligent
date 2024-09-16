import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'src/Shared/infrastructure/db/db.sequelize.config';

class Product extends Model {
    declare id: string;
    declare name: string;
    declare productImage: string;
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
    productImage:{
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



export default Product