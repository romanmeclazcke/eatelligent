import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'src/Shared/infrastructure/db/db.sequelize.config';
import User from 'src/user/infrastructure/models/user.models';

class Follow extends Model {
    declare followerId: string;
    declare followedId: string;
    declare followedAt: Date;
}

Follow.init(
  {
    followerId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    followedId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    followedAt: { 
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
    }
  },
  {
    sequelize, 
    tableName: 'Follow',
    timestamps: false,
  },
);

Follow.belongsTo(User,{foreignKey:'followerId',targetKey:'id',as:'follower'})
Follow.belongsTo(User,{foreignKey:'followerId',targetKey:'id',as:'followed'})


export default Follow