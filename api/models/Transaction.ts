import { Model, DataTypes, Sequelize } from 'sequelize';

export interface TransactionAttributes {
  id: number;
  user_id: number;
  username: string;
  payment_type: 'PaySafeCard' | 'Transcash';
  payment_codes: string;
  payment_date: Date;
  payment_status: string;
  payment_value: number;
  final_amount: number;
  receiver_address: string;
  payment_method: 'crypto' | 'paypal';
  crypto_type?: string;
}

export interface TransactionCreationAttributes extends Omit<TransactionAttributes, 'id'> {}

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
  declare id: number;
  declare user_id: number;
  declare username: string;
  declare payment_type: 'PaySafeCard' | 'Transcash';
  declare payment_codes: string;
  declare payment_date: Date;
  declare payment_status: string;
  declare payment_value: number;
  declare final_amount: number;
  declare receiver_address: string;
  declare payment_method: 'crypto' | 'paypal';
  declare crypto_type?: string;

  public static initialize(sequelize: Sequelize): void {
    Transaction.init({
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
      payment_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['PaySafeCard', 'Transcash']]
        }
      },
      payment_codes: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      payment_status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'pending'
      },
      payment_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      final_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      receiver_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      payment_method: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isIn: [['crypto', 'paypal']]
        }
      },
      crypto_type: {
        type: DataTypes.STRING(10),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'transactions',
      timestamps: false
    });
  }
}