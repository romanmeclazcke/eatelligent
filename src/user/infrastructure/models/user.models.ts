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
  lastName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  birthdate:{
    type:DataTypes.DATEONLY,//sin hora
    allowNull:false
  },
  userName:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  biography:{
    type:DataTypes.STRING(50)
  },
  profilePicture:{
    type:DataTypes.STRING(50),
    allowNull:false,
    defaultValue:"hola" //imagen default
  }
}, {
  sequelize,
  tableName: 'User',
  timestamps: true,  // Asegúrate de que timestamps esté configurado según tus necesidades
});

export default User;