import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'src/shared/infrastructure/db/db.sequelize.config';
import User from 'src/user/infrastructure/models/user.models';

class Follow extends Model {
    declare id: string;
    declare userId: string;
    declare description?: string;
    declare image?: string;
}

Follow.init(
  {
    followerId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    followedId: {
      type: DataTypes.STRING,
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