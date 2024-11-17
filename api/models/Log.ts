import { Model, DataTypes, Sequelize } from 'sequelize';

export interface LogAttributes {
  id: number;
  action: string;
  details: string;
  admin_username: string;
  timestamp: Date;
}

export interface LogCreationAttributes extends Omit<LogAttributes, 'id'> {}

export class Log extends Model<LogAttributes, LogCreationAttributes> {
  declare id: number;
  declare action: string;
  declare details: string;
  declare admin_username: string;
  declare timestamp: Date;

  public static initialize(sequelize: Sequelize): void {
    Log.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      action: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      admin_username: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      tableName: 'logs',
      timestamps: false
    });
  }
}