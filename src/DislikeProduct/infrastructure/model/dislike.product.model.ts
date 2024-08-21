import { DataTypes, Model } from 'sequelize';
import Product from 'src/Product/infrastructure/model/product.model';
import { sequelize } from 'src/shared/infrastructure/db/db.sequelize.config';
import User from 'src/user/infrastructure/models/user.models';

class DislikeProduct extends Model {
    declare id:string
    declare userId:string
    declare productId:string
}

DislikeProduct.init({
  id: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
},{
    sequelize, 
    tableName: 'DislikeProduct',
    timestamps: false,
  }
);

DislikeProduct.belongsTo(User,{foreignKey:'userId',targetKey:'id',as:'user'})
DislikeProduct.belongsTo(Product,{foreignKey:'productId',targetKey:'id',as:'dislikeProduct'})
export default DislikeProduct;
