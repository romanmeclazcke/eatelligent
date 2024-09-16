import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'src/Shared/infrastructure/db/db.sequelize.config';
import User from 'src/user/infrastructure/models/user.models';
import Post from 'src/Post/infrastructure/model/post.model';

class Comment extends Model {
    declare id: string;
    declare userId: string;
    declare postId: string;
    declare comment: string;
    declare commentedAt:Date
    declare status:boolean
}

Comment.init(
  {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false,
        primaryKey: true,
      },
    userId: {
      type:DataTypes.UUID,
      allowNull: false,
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    comment:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    commentedAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
  },
  {
    sequelize, 
    tableName: 'Comment',
    timestamps: false,
  },
);

Comment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'userCommentedPost' });
//Comment.belongsTo(Post, { foreignKey: 'postId', targetKey: 'id'});



export default Comment