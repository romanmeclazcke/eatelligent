import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'src/shared/infrastructure/db/db.sequelize.config';

class User extends Model{
  declare id:string
  declare name:string
  declare createAt:Date
  declare updateAt:Date
}

User.init({
  id: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Users',
  timestamps: true,  // Asegúrate de que timestamps esté configurado según tus necesidades
});

export default User;