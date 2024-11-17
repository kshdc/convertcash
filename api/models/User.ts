import { Model, DataTypes, Sequelize } from 'sequelize';

export interface UserAttributes {
  id: number;
  user_id: number;
  username: string;
  password: string;
  mail: string;
  adresse_ip?: string;
  rank: string;
  reward_rank: string | null;
  xp: number;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare user_id: number;
  declare username: string;
  declare password: string;
  declare mail: string;
  declare adresse_ip: string;
  declare rank: string;
  declare reward_rank: string | null;
  declare xp: number;

  public static initialize(sequelize: Sequelize): void {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      mail: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      adresse_ip: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      rank: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'default'
      },
      reward_rank: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null
      },
      xp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      sequelize,
      tableName: 'users',
      timestamps: false
    });
  }
}