import { Sequelize } from "sequelize";
import { BreedModel } from "src/models/breedModel";
import { ImageModel } from "src/models/imageModel";

export class ImageRepository {
  private readonly imageModel: typeof ImageModel;
  constructor() {
    this.imageModel = ImageModel;
  }

  public async getById(id: string): Promise<ImageModel> {
    return this.imageModel.findByPk(id);
  }

  public async deleteById(id: string): Promise<number> {
    return this.imageModel.destroy({
      where: { id },
    });
  }

  public async find(
    options?: { 
      orderBy?: string, 
      sort?: string,
      limit?: number
    }
  ): Promise<ImageModel[]> {
    const orderBy = options.orderBy || 'id';
    const sort = options.sort === "DESC" ? "DESC" : "ASC";

    return this.imageModel.findAll({
      order: [[orderBy, sort]],
    });
  }

  public async random(
    options?: { 
      limit?: number
    }
  ): Promise<ImageModel[]> {
    const limit = options.limit 
      ? options.limit > 20 ? 20 : options.limit
      : Math.floor(Math.random() * 20);

    return this.imageModel.findAll({
      order: Sequelize.literal('rand()'),
      limit
    });
  }

  public async create(data: Partial<ImageModel>): Promise<ImageModel> {
    return this.imageModel.create(data);
  }
}
