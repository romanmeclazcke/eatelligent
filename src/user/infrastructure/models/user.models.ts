import { DataTypes } from 'sequelize';
import { sequelize } from 'src/shared/infrastructure/db/db.sequelize.config';

const User = sequelize.define('User', {
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
  tableName: 'Users',
});

export default User;
