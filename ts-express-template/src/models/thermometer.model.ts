import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface ThermometerAttributes {
  id: string;
  deviceId: string;
  temperature: number;
  humidity: number | null;
  batteryLevel: number;
  location: string;
  recordedAt: Date;
}

// For creation, we omit the id (it's auto-generated) and make humidity truly optional
type ThermometerCreationAttributes = Optional<
  Omit<ThermometerAttributes, 'id'>,
  'humidity'
>;

class Thermometer extends Model<ThermometerAttributes, ThermometerCreationAttributes>
  implements ThermometerAttributes {
  public id!: string;
  public deviceId!: string;
  public temperature!: number;
  public humidity!: number | null;
  public batteryLevel!: number;
  public location!: string;
  public recordedAt!: Date;
}

Thermometer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    deviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    batteryLevel: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recordedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'thermometers',
    timestamps: false,
  }
);

export default Thermometer;