import { DataTypes, Model } from "sequelize";
import {
  SequelizeProvider,
  SequelizeProviderImpl,
} from "../provider/sequelize";
import { ImageModel } from "./imageModel";

const sequelizeProviderImpl: SequelizeProvider = SequelizeProviderImpl.getInstance();

const breedModelSchema = {
  id: {
    type: DataTypes.STRING(9),
    primaryKey: true,
    field: "id",
  },
  bidability: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "bidability",
  },
  cat_friendly: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "cat_friendly",
  },
  adaptability: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "adaptability",
  },
  affection_level: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "affection_level",
  },
  child_friendly: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "child_friendly",
  },
  dog_friendly: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "dog_friendly",
  },
  energy_level: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "energy_level",
  },
  experimental: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "experimental",
  },
  grooming: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "grooming",
  },
  hairless: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "hairless",
  },
  health_issues: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "health_issues",
  },
  hypoallergenic: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "hypoallergenic",
  },
  indoor: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "indoor",
  },
  intelligence: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "intelligence",
  },
  lap: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "lap",
  },
  rare: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "rare",
  },
  rex: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "rex",
  },
  shedding_level: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "shedding_level",
  },
  short_legs: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "short_legs",
  },
  social_needs: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "social_needs",
  },
  stranger_friendly: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "stranger_friendly",
  },
  suppressed_tail: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "suppressed_tail",
  },
  vocalisation: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "vocalisation",
  },
  natural: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "natural",
  },
  alt_names: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "alt_names",
  },
  cfa_url: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "cfa_url",
  },
  country_code: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "country_code",
  },
  country_codes: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "country_codes",
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "description",
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "name",
  },
  origin: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "origin",
  },
  life_span: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "life_span",
  },
  resourceId: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "resource_id",
  },
  temperament: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "temperament",
  },
  vcahospitals_url: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "vcahospitals_url",
  },
  vetstreet_url: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "vetstreet_url",
  },
  wikipedia_url: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "wikipedia_url",
  },
  reference_image_id: {
    allowNull: true,
    type: DataTypes.STRING(9),
    field: "reference_image_id",
    references: {
      model: "image",
      key: "id",
    },
  },
  weight: {
    type: DataTypes.JSON,
    allowNull: true,
    field: "weight",
  },
};

class BreedModel extends Model {
  public id: string;
  public bidability: number;
  public adaptability: number;
  public affection_level: number;
  public child_friendly: number;
  public dog_friendly: number;
  public energy_level: number;
  public experimental: number;
  public grooming: number;
  public hairless: number;
  public health_issues: number;
  public hypoallergenic: number;
  public indoor: number;
  public intelligence: number;
  public lap: number;
  public rare: number;
  public rex: number;
  public shedding_level: number;
  public short_legs: number;
  public social_needs: number;
  public stranger_friendly: number;
  public suppressed_tail: number;
  public vocalisation: number;
  public natural: number;
  public alt_names: string;
  public cfa_url: string;
  public country_code: string;
  public country_codes: string;
  public description: string;
  public name: string;
  public origin: string;
  public life_span: string;
  public resourceId: string;
  public temperament: string;
  public vcahospitals_url: string;
  public vetstreet_url: string;
  public wikipedia_url: string;
  public reference_image_id: string;
  public weight: {
    imperial: string;
    metric: string;
  }
  public image: ImageModel;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

BreedModel.init(breedModelSchema, {
  // Other model options go here
  sequelize: sequelizeProviderImpl.sequelize(), // We need to pass the connection instance
  tableName: 'breed', // We need to choose the table name
});

BreedModel.belongsTo(ImageModel, {
  foreignKey: "reference_image_id",
  as: 'image',
});

// BreedModel.sync({ alter: true });
export { BreedModel };
