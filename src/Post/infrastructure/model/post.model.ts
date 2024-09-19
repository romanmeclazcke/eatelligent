import { DataTypes, Model } from 'sequelize';
import Comment from 'src/Comment/infrastructure/model/comment.model';
import { sequelize } from 'src/Shared/infrastructure/db/db.sequelize.config';
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

Post.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'author' });
Post.hasMany(Comment, {foreignKey: 'postId',as: 'comments',});

export default Post