import { DataTypes, Model } from 'sequelize';
import Post from 'src/Post/infrastructure/model/post.model';
import { sequelize } from 'src/Shared/infrastructure/db/db.sequelize.config';
import User from 'src/user/infrastructure/models/user.models';

class Like extends Model {
    declare userId: string;
    declare postId: string;
}

Like.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    }
  },
  {
    sequelize, 
    tableName: 'Like',
    timestamps: false,
  },
);
Like.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'userLike' });
Like.belongsTo(Post, { foreignKey: 'postId', targetKey: 'id', as: 'postLiked' });


export default Like