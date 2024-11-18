import { Model, DataTypes, Sequelize } from 'sequelize';

export interface NotificationAttributes {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: 'transaction' | 'system' | 'reward';
  read: boolean;
  created_at: Date;
}

export interface NotificationCreationAttributes extends Omit<NotificationAttributes, 'id'> {}

export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> {
  declare id: number;
  declare user_id: number;
  declare title: string;
  declare message: string;
  declare type: 'transaction' | 'system' | 'reward';
  declare read: boolean;
  declare created_at: Date;

  public static initialize(sequelize: Sequelize): void {
    Notification.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('transaction', 'system', 'reward'),
        allowNull: false
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      tableName: 'notifications',
      timestamps: false
    });
  }
}