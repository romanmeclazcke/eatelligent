import { DataTypes, Model } from 'sequelize';
import Post from 'src/Post/infrastructure/model/post.model';
import { sequelize } from 'src/shared/infrastructure/db/db.sequelize.config';
import User from 'src/user/infrastructure/models/user.models';

class FavoritePost extends Model {
    declare id:string
    declare userId:string
    declare postId:string
    declare addedAt:Date
}

FavoritePost.init({
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
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  addedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:DataTypes.NOW
  }
},{
    sequelize, 
    tableName: 'FavoritePost',
    timestamps: false,
  }
);

FavoritePost.belongsTo(User,{foreignKey:'userId',targetKey:'id',as:'userFavoritePost'})
FavoritePost.belongsTo(Post,{foreignKey:'postId',targetKey:'id',as:'favoritePost'})
export default FavoritePost;
