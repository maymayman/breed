import { DataTypes, Model } from "sequelize";
import {
  SequelizeProvider,
  SequelizeProviderImpl,
} from "../provider/sequelize";
import randomstring from "randomstring";

const sequelizeProviderImpl: SequelizeProvider = SequelizeProviderImpl.getInstance();

const imageModelSchema = {
  id: {
    type: DataTypes.STRING(9),
    primaryKey: true,
    field: "id",
    defaultValue: randomstring.generate({ length: 9 })
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "height",
  },
  width: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "width",
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "url",
  }
};

class ImageModel extends Model {
  public id: string;
  public height: number;
  public width: number;
  public url: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
};

ImageModel.init(imageModelSchema, {
  // Other model options go here
  sequelize: sequelizeProviderImpl.sequelize(), // We need to pass the connection instance
  tableName: 'image', // We need to choose the table name
});
// ImageModel.sync({ alter: true });

export { ImageModel };
