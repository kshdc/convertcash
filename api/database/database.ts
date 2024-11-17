import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Transaction } from '../models/Transaction';
import { Log } from '../models/Log';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: process.env.DB_HOST || '85.215.169.44',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'ketama',
  database: process.env.DB_DATABASE || 'myconvert',
  define: {
    timestamps: false,
  },
  logging: false,
  timezone: '+02:00',
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 30000,
  },
  dialectOptions: {
    connectTimeout: 30000
  },
});

User.initialize(sequelize);
Transaction.initialize(sequelize);
Log.initialize(sequelize);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

export { sequelize };