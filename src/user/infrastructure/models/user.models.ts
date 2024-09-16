import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'src/Shared/infrastructure/db/db.sequelize.config';

class User extends Model {
  declare id: string;
  declare name: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare birthdate: Date;
  declare userName: string;
  declare biography?: string;
  declare profilePicture?: string;
  declare validateEmail:boolean
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
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  validateEmail:{
    type:DataTypes.BOOLEAN,
    allowNull:false
  }
}, {
  sequelize,
  tableName: 'User',
  timestamps: true,  // Esto asegura que se gestionen los campos createdAt y updatedAt
  indexes: [
    { unique: true, fields: ['email']},
    { unique:true, fields:['userName']}
  ] //indexo la tabla apartir de estos campos que son unicos
});

export default User;
