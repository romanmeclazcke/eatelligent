import { DataTypes, Model } from 'sequelize';
import Like from 'src/Like/infrastructure/model/like.model';
import { sequelize } from 'src/shared/infrastructure/db/db.sequelize.config';
import User from 'src/user/infrastructure/models/user.models';

class Post extends Model {
    declare id: string;
    declare userId: string;
    declare description?: string;
    declare image?: string;
}

Post.init(
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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, 
    tableName: 'Post',
    timestamps: true,
  },
);

Post.belongsTo(User,{foreignKey:'userId',targetKey:'id',as:'author'})
export default Post